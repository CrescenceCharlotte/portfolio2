"use client"

import { useEffect, useRef } from "react"
import type { Vector2 as ThreeVector2 } from "three"

/* ─── Vertex shader : étoiles filantes ───────────────────────────────── */
const VERT_STAR = `
precision highp float;
precision highp int;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec4 mouse;
attribute vec2 aFront;
attribute float random;
uniform vec2  resolution;
uniform float pixelRatio;
uniform float timestamp;
uniform float size;
uniform float minSize;
uniform float speed;
uniform float far;
uniform float spread;
uniform float maxSpread;
uniform float maxZ;
uniform float maxDiff;
uniform float diffPow;
varying float vProgress;
varying float vRandom;
varying float vDiff;
varying float vSpreadLength;
varying float vPositionZ;

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}
const float PI  = 3.1415926;
const float PI2 = PI * 2.;

void main() {
  float progress = clamp((timestamp - mouse.z) * speed, 0., 1.);
  progress *= step(0., mouse.x);
  float startX = mouse.x - resolution.x * 0.5;
  float startY = mouse.y - resolution.y * 0.5;
  vec3  startPos = vec3(startX, startY, random);
  float diff = clamp(mouse.w / maxDiff, 0., 1.);
  diff = pow(diff, diffPow);
  vec3  cp = position * 2. - 1.;
  float radian   = cp.x * PI2 - PI;
  vec2  xySpread = vec2(cos(radian), sin(radian)) * spread * mix(1., maxSpread, diff) * cp.y;
  vec3 endPos = startPos;
  endPos.xy += xySpread;
  endPos.xy -= aFront * far * random;
  endPos.z  += cp.z * maxZ * (pixelRatio > 1. ? 1.2 : 1.);
  float posP = cubicOut(progress * random);
  vec3  pos  = mix(startPos, endPos, posP);
  vProgress     = progress;
  vRandom       = random;
  vDiff         = diff;
  vSpreadLength = cp.y;
  vPositionZ    = position.z;
  gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  gl_PointSize = max(pos.z * size * diff * pixelRatio, minSize * (pixelRatio > 1. ? 1.3 : 1.));
}`.trim()

/* ─── Fragment shader : étoiles filantes ─────────────────────────────── */
const FRAG_STAR = `
precision highp float;
precision highp int;
uniform float fadeSpeed;
uniform float shortRangeFadeSpeed;
uniform float minFlashingSpeed;
uniform float blur;
varying float vProgress;
varying float vRandom;
varying float vDiff;
varying float vSpreadLength;
varying float vPositionZ;

highp float rand(vec2 co) {
  highp float a  = 12.9898;
  highp float b  = 78.233;
  highp float c  = 43758.5453;
  highp float dt = dot(co.xy, vec2(a, b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}
float quadIn(float t)   { return t * t; }
#define HALF_PI 1.5707963267948966
float sineOut(float t)  { return sin(t * HALF_PI); }
const vec3 BASE = vec3(170., 133., 88.) / 255.;

void main() {
  vec2  p   = gl_PointCoord * 2. - 1.;
  float len = length(p);
  float cr  = rand(vec2(vProgress * mix(minFlashingSpeed, 1., vRandom)));
  cr = mix(0.3, 2., cr);
  float cBlur = blur * mix(1., 0.3, vPositionZ);
  float shape = smoothstep(1. - cBlur, 1. + cBlur, (1. - cBlur) / len);
  shape *= mix(0.5, 1., vRandom);
  if (shape == 0.) discard;
  float dark  = mix(0.1, 1., vPositionZ);
  float ap    = vProgress * fadeSpeed * mix(2.5, 1., pow(vDiff, 0.6));
  ap *= mix(shortRangeFadeSpeed, 1., sineOut(vSpreadLength) * quadIn(vDiff));
  float alpha = (1. - min(ap, 1.)) * cr * vDiff;
  gl_FragColor = vec4(BASE * dark * cr, shape * alpha);
}`.trim()

/* ─── Vertex shader : plan texte ─────────────────────────────────────── */
const VERT_PLAIN = `
precision highp float;
precision highp int;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`.trim()

/* ─── Fragment shader : plan texte ───────────────────────────────────── */
const FRAG_TEXT = `
precision highp float;
precision highp int;
uniform sampler2D map;
uniform float uProgress;
uniform float uStartX;
uniform float uRatio;
uniform float alpha;
varying vec2 vUv;
void main() {
  vec4  tc    = texture2D(map, vUv);
  float angle = uRatio / 3.;
  float show  = step(1., 1. - vUv.x + (uProgress / uStartX * 0.5 + 0.5) - abs(vUv.y - 0.5) / angle);
  gl_FragColor = vec4(tc.rgb, tc.a * alpha * show);
}`.trim()

/* ─── Fonctions d'easing ──────────────────────────────────────────────── */
type EaseFn = (t: number, b: number, c: number, d: number) => number

const easeInOutCubic: EaseFn = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t * t + b
  t -= 2
  return (c / 2) * (t * t * t + 2) + b
}

const easeOutQuint: EaseFn = (t, b, c, d) =>
  c * (Math.pow(t / d - 1, 5) + 1) + b

function runAnim(
  fn: (pos: number) => void,
  opts: { begin?: number; finish?: number; duration?: number; ease?: EaseFn; onAfter?: () => void }
) {
  const { begin = 0, finish = 1, duration = 500, ease = easeInOutCubic, onAfter } = opts
  const change = finish - begin
  let t0: number | null = null
  const tick = (ts: number) => {
    if (t0 === null) t0 = ts
    const t = Math.min(duration, ts - t0)
    fn(ease(t, begin, change, duration))
    t < duration ? requestAnimationFrame(tick) : onAfter?.()
  }
  requestAnimationFrame(tick)
}

/* ─── Constantes ─────────────────────────────────────────────────────── */
const CAMERA_Z   = 5000
const PER_MOUSE  = 800
const STAR_COUNT = PER_MOUSE * 400
const M_STRIDE   = 4
const F_STRIDE   = 2

/* ─── Composant ──────────────────────────────────────────────────────── */
export function HeroShootingStar() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const msgRef      = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const bgStarsRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let destroyed = false
    let rafId     = 0
    let dispose: (() => void) | null = null

    /* ── Étoiles CSS de fond ──────────────────────── */
    const bg = bgStarsRef.current
    if (bg) {
      for (let i = 0; i < 150; i++) {
        const s    = document.createElement("div")
        const sz   = (0.7 + Math.random() * 1.9).toFixed(2)
        const anim = i % 3 === 0 ? "hssTwB" : i % 3 === 1 ? "hssTwC" : "hssTwA"
        s.style.cssText = `
          position:absolute;
          left:${(Math.random()*100).toFixed(2)}%;
          top:${(Math.random()*100).toFixed(2)}%;
          width:${sz}px; height:${sz}px;
          background:${i%5===0?"rgba(255,248,220,0.85)":i%7===0?"rgba(210,228,255,0.9)":"rgba(255,255,255,0.85)"};
          border-radius:50%;
          box-shadow:0 0 2px 0.5px rgba(150,190,255,0.4);
          animation:${anim} ${(2.5+Math.random()*4.5).toFixed(2)}s linear ${(Math.random()*7).toFixed(2)}s infinite both;
        `
        bg.appendChild(s)
      }
    }

    async function init() {
      const canvas = canvasRef.current
      if (!canvas || destroyed) return

      const THREE = await import("three")
      if (destroyed) return

      await document.fonts.ready
      if (destroyed) return

      /* ─── Dimensions ───────────────────────────── */
      const el = canvas.parentElement!
      let cw = el.clientWidth
      let ch = el.clientHeight
      let hw = cw / 2
      let hh = ch / 2

      /* ─── Renderer ─────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(cw, ch, false)

      /* ─── Caméra ────────────────────────────────── */
      const fov    = Math.atan(ch / 2 / CAMERA_Z) * (180 / Math.PI) * 2
      const camera = new THREE.PerspectiveCamera(fov, cw / ch, 1, CAMERA_Z)
      camera.position.set(0, 0, CAMERA_Z)
      camera.updateProjectionMatrix()

      const scene = new THREE.Scene()

      /* ─── Redimensionnement ─────────────────────── */
      const onResize = () => {
        if (destroyed) return
        cw = el.clientWidth; ch = el.clientHeight
        hw = cw / 2;        hh = ch / 2
        camera.aspect = cw / ch
        camera.updateProjectionMatrix()
        renderer.setSize(cw, ch, false)
        starUniforms.resolution.value.set(cw, ch)
      }
      window.addEventListener("resize", onResize)

      /* ─── Géométrie étoiles filantes ────────────── */
      const posArr = new Float32Array(STAR_COUNT * 3)
      const mArr   = new Float32Array(STAR_COUNT * M_STRIDE)
      const fArr   = new Float32Array(STAR_COUNT * F_STRIDE)
      const rArr   = new Float32Array(STAR_COUNT)
      for (let i = 0; i < STAR_COUNT; i++) {
        posArr[i * 3]     = Math.random()
        posArr[i * 3 + 1] = Math.random()
        posArr[i * 3 + 2] = Math.random()
        mArr[i * M_STRIDE]     = -1
        mArr[i * M_STRIDE + 1] = -1
        rArr[i] = Math.random()
      }

      const starGeo   = new THREE.BufferGeometry()
      const mouseAttr = new THREE.BufferAttribute(mArr, M_STRIDE)
      const frontAttr = new THREE.BufferAttribute(fArr, F_STRIDE)
      starGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3))
      starGeo.setAttribute("mouse",    mouseAttr)
      starGeo.setAttribute("aFront",   frontAttr)
      starGeo.setAttribute("random",   new THREE.BufferAttribute(rArr, 1))

      const starUniforms = {
        resolution:          { value: new THREE.Vector2(cw, ch) },
        pixelRatio:          { value: renderer.getPixelRatio() },
        timestamp:           { value: 0 },
        size:                { value: 0.05 },
        minSize:             { value: 1 },
        speed:               { value: 0.012 },
        fadeSpeed:           { value: 1.1 },
        shortRangeFadeSpeed: { value: 1.3 },
        minFlashingSpeed:    { value: 0.1 },
        spread:              { value: 7 },
        maxSpread:           { value: 5 },
        maxZ:                { value: 100 },
        blur:                { value: 1 },
        far:                 { value: 10 },
        maxDiff:             { value: 100 },
        diffPow:             { value: 0.24 },
      }

      const starMat = new THREE.RawShaderMaterial({
        uniforms: starUniforms, vertexShader: VERT_STAR, fragmentShader: FRAG_STAR,
        transparent: true, depthTest: false, blending: THREE.AdditiveBlending,
      })
      const starMesh = new THREE.Points(starGeo, starMat)
      starMesh.frustumCulled = false
      scene.add(starMesh)

      /* ─── Tracé d'étoile ────────────────────────── */
      let mouseI  = 0
      let oldPos: ThreeVector2 | null = null
      let curTime = 0

      function drawStar(cx: number, cy: number) {
        const x  = cx + hw
        const y  = ch - (cy + hh)
        const np = new THREE.Vector2(x, y)
        const d  = oldPos ? np.clone().sub(oldPos) : new THREE.Vector2()
        const dl = d.length()
        const fv = d.clone().normalize()
        for (let i = 0; i < PER_MOUSE; i++) {
          const pi = (mouseI + i) % STAR_COUNT
          const mi = pi * M_STRIDE
          const fi = pi * F_STRIDE
          const p  = oldPos
            ? oldPos.clone().add(d.clone().multiplyScalar(i / PER_MOUSE))
            : np
          mArr[mi]     = p.x
          mArr[mi + 1] = p.y
          mArr[mi + 2] = curTime
          mArr[mi + 3] = dl
          fArr[fi]     = fv.x
          fArr[fi + 1] = fv.y
        }
        oldPos = np
        mouseAttr.needsUpdate = true
        frontAttr.needsUpdate = true
        mouseI = (mouseI + PER_MOUSE) % STAR_COUNT
      }

      /* ─── Texture texte (titre CHARLOTTE / CRESCENCE) ── */
      const isMob    = cw < 768
      const fontSize = cw < 360 ? 40 : cw < 768 ? 58 : cw < 1200 ? 82 : 108
      const spacing  = isMob ? 0.09 : 0.13
      const dpr      = window.devicePixelRatio

      /*
       * On évite measureText() qui n'inclut pas toujours le letterSpacing.
       * Largeur = 16× fontSize, plafonnée à 90 % de l'écran pour que
       * uStartX reste positif et que l'animation de révélation fonctionne.
       */
      const targetW  = Math.min(fontSize * 16, cw * 0.90)

      /*
       * Hauteur = 4.8× fontSize → marges top/bottom ≈ 0.7× fontSize par ligne.
       * Évite tout clipping des ascendants/italiques de Playfair Display.
       */
      const lineH   = fontSize * 1.4      // interligne
      const padY    = fontSize * 1.0      // marge verticale (haut et bas)
      const totalH  = 2 * lineH + 2 * padY   // hauteur totale en unités monde
      const y1World = padY + lineH * 0.5   // centre ligne 1
      const y2World = padY + lineH * 1.5   // centre ligne 2

      const tc = document.createElement("canvas")
      tc.width  = Math.ceil(targetW * dpr)
      tc.height = Math.ceil(totalH * dpr)
      const ctx = tc.getContext("2d")!
      ctx.font  = `italic 700 ${fontSize * dpr}px 'Playfair Display', Georgia, serif`
      if ("letterSpacing" in ctx)
        (ctx as never as { letterSpacing: string }).letterSpacing = `${spacing}em`
      ctx.fillStyle    = "rgba(210, 228, 255, 0.97)"
      ctx.textAlign    = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("CHARLOTTE", tc.width / 2, y1World * dpr)
      ctx.fillText("CRESCENCE", tc.width / 2, y2World * dpr)

      const planeW = tc.width  / dpr
      const planeH = tc.height / dpr

      const tex       = new THREE.Texture(tc)
      tex.needsUpdate = true
      tex.minFilter   = THREE.LinearFilter

      const textUniforms = {
        map:       { value: tex },
        uProgress: { value: -hw },
        uStartX:   { value: Math.max(hw - planeW / 2, 1) },
        uRatio:    { value: planeW / planeH },
        alpha:     { value: 0.97 },
      }

      const textGeo          = new THREE.PlaneGeometry(planeW, planeH)
      const textMat          = new THREE.RawShaderMaterial({
        uniforms: textUniforms, vertexShader: VERT_PLAIN, fragmentShader: FRAG_TEXT,
        transparent: true,
      })
      const textMesh         = new THREE.Mesh(textGeo, textMat)
      textMesh.frustumCulled = false
      textMesh.position.z    = 0.1
      /* Remonte le titre d'environ 12 % de la hauteur de l'écran */
      textMesh.position.y    = hh * 0.24
      scene.add(textMesh)

      /* ─── Interaction souris / tactile ──────────── */
      const onPointerMove = (e: PointerEvent) =>
        drawStar(e.clientX - hw, e.clientY - hh)
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0]
        drawStar(t.clientX - hw, t.clientY - hh)
      }

      /* ─── Révélation texte + apparition sous-titres ─ */
      function textStart() {
        runAnim(
          (p) => {
            if (destroyed) return
            drawStar(p, 0)
            textUniforms.uProgress.value = p - cw * 0.08
          },
          {
            begin: -hw * 1.1, finish: hw * 1.1,
            duration: 1080, ease: easeOutQuint,
            onAfter: () => {
              if (destroyed) return
              oldPos = null
              window.addEventListener("pointermove", onPointerMove)
              window.addEventListener("touchmove",   onTouchMove)
              /* Apparition du message + sous-titres */
              if (msgRef.current)      msgRef.current.style.opacity      = "1"
              if (subtitleRef.current) {
                subtitleRef.current.style.opacity   = "1"
                subtitleRef.current.style.transform = "translateX(-50%) translateY(0)"
              }
            },
          }
        )
      }

      /* ─── Boucle RAF ────────────────────────────── */
      let t0: number | null = null
      const loop = (ts: number) => {
        if (destroyed) return
        if (!t0) t0 = ts
        curTime = (ts - t0) * (60 / 1000)
        starUniforms.timestamp.value = curTime
        renderer.render(scene, camera)
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)

      /* ─── Séquence d'intro ──────────────────────── */
      const period    = Math.PI * 3
      const amplitude = Math.min(Math.max(cw * 0.1, 100), 180)
      setTimeout(() => {
        if (destroyed) return
        runAnim(
          (p) => {
            if (destroyed) return
            drawStar(Math.cos(p * period) * amplitude, (p * ch - hh) * 1.3)
          },
          {
            duration: 1200,
            onAfter: () => {
              if (destroyed) return
              drawStar(-hw, ch - hh)
              drawStar(-hw * 1.1, 0)
              setTimeout(() => { if (!destroyed) textStart() }, 300)
            },
          }
        )
      }, 300)

      /* ─── Nettoyage ─────────────────────────────── */
      dispose = () => {
        window.removeEventListener("resize",      onResize)
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("touchmove",   onTouchMove)
        renderer.dispose()
        starGeo.dispose(); starMat.dispose()
        textGeo.dispose(); textMat.dispose()
        tex.dispose()
      }
    }

    init()

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      dispose?.()
      if (bg) while (bg.firstChild) bg.removeChild(bg.firstChild)
    }
  }, [])

  return (
    <section
      data-hide-star-cursor="true"
      style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}
      aria-label="Hero — Charlotte Crescence"
    >
      {/* Étoiles CSS de fond (identiques au reste du site) */}
      <div
        ref={bgStarsRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
      />

      {/* Canvas WebGL — cursor: none pour éviter le double curseur */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          cursor: "none", zIndex: 1,
        }}
      />

      {/* Sous-titre + BTS — apparaît après l'animation */}
      <div
        ref={subtitleRef}
        style={{
          position:   "absolute",
          left:       "50%",
          top:        "58%",
          transform:  "translateX(-50%) translateY(10px)",
          textAlign:  "center",
          whiteSpace: "nowrap",
          opacity:    0,
          transition: "opacity 900ms ease, transform 900ms ease",
          zIndex:     3,
          pointerEvents: "none",
        }}
      >
        {/* Séparateur or fin */}
        <div style={{
          width: "40px", height: "1px",
          background: "rgba(197, 160, 89, 0.5)",
          margin: "0 auto 1rem",
        }} />

        {/* "Créer l'étincelle" */}
        <p style={{
          margin:        0,
          fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
          fontStyle:     "italic",
          fontWeight:    400,
          fontSize:      "clamp(1.1rem, 2vw, 1.6rem)",
          color:         "rgba(210, 228, 255, 0.75)",
          letterSpacing: "0.04em",
          lineHeight:    1.3,
        }}>
          Créer l&apos;étincelle
        </p>

        {/* "BTS Communication" */}
        <p style={{
          margin:        "0.6rem 0 0",
          fontFamily:    "var(--font-sans, Inter, sans-serif)",
          fontWeight:    400,
          fontSize:      "clamp(0.6rem, 1vw, 0.75rem)",
          color:         "rgba(197, 160, 89, 0.65)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}>
          BTS Communication
        </p>
      </div>


      <style>{`
        @keyframes hssTwA {
          0%,100% { opacity:0.08; transform:scale(0.7);  }
          35%      { opacity:1;    transform:scale(1.25); }
          65%      { opacity:0.25; transform:scale(0.85); }
        }
        @keyframes hssTwB {
          0%,100% { opacity:0.12; transform:scale(0.8);  }
          50%      { opacity:0.9;  transform:scale(1.3);  }
          80%      { opacity:0.2;  transform:scale(0.9);  }
        }
        @keyframes hssTwC {
          0%,100% { opacity:0.05; transform:scale(0.6);  }
          25%      { opacity:0.7;  transform:scale(1.1);  }
          55%      { opacity:0.15; transform:scale(0.8);  }
          75%      { opacity:0.85; transform:scale(1.2);  }
        }
        @keyframes hssScrollIn {
          from { opacity:0; transform:translateX(-50%) translateY(10px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0);    }
        }
        @keyframes hssPulse {
          0%,100% { opacity:0.35; transform:scaleY(1);    }
          50%      { opacity:0.85; transform:scaleY(1.12); }
        }
      `}</style>
    </section>
  )
}
