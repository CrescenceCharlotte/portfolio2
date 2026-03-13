"use client"

import { useEffect, useRef } from "react"
import styles from "./Hero3D.module.css"

/* ============================================================
   Configuration de la scène 3D
   ============================================================ */
const STAR_COUNT    = 45
const Z_GAP         = 1800  // espace entre chaque mot
const BG_STAR_COUNT = 140

/* ── 5 mots, apparaissent UNE SEULE FOIS, dans l'ordre ── */
const TEXT_ITEMS: {
  text: string
  x: number
  y: number
  rot: number
  size: string
  gold: boolean
}[] = [
  { text: "CHARLOTTE",       x:  -15, y:  -8, rot: -0.2, size: "7.5vw", gold: false },
  { text: "CRESCENCE",       x:   15, y:   8, rot:  0.2, size: "7.5vw", gold: false },
  { text: "PORTFOLIO",       x:    0, y:   0, rot:  0.0, size: "4vw",   gold: true  },
  { text: "BTS",             x:  -10, y:   0, rot: -0.2, size: "5.5vw", gold: false },
  { text: "COMMUNICATION",   x:   10, y:   0, rot:  0.2, size: "3.8vw", gold: true  },
]

// Chaque item placé devant la caméra, espacé de Z_GAP
// CAM_TOTAL_Z = juste assez pour passer devant tous les items
const CAM_TOTAL_Z = TEXT_ITEMS.length * Z_GAP + 1000
// LOOP_SIZE n'est utilisé que pour les étoiles (particules)
const LOOP_SIZE = TEXT_ITEMS.length * Z_GAP

/* ============================================================
   Types internes
   ============================================================ */
type SceneItem = {
  el: HTMLElement
  type: "text" | "star"
  x: number
  y: number
  rot: number
  baseZ: number
}

/* ============================================================
   Composant Hero3D
   ============================================================ */
export function Hero3D() {
  const sectionRef   = useRef<HTMLElement>(null)
  const worldRef     = useRef<HTMLDivElement>(null)
  const viewportRef  = useRef<HTMLDivElement>(null)
  const bgStarsRef   = useRef<HTMLDivElement>(null)
  const exitFadeRef  = useRef<HTMLDivElement>(null)
  const fpsRef       = useRef<HTMLElement>(null)
  const velRef       = useRef<HTMLElement>(null)
  const coordRef     = useRef<HTMLElement>(null)

  useEffect(() => {
    const section  = sectionRef.current
    const world    = worldRef.current
    const viewport = viewportRef.current
    const bgStars  = bgStarsRef.current
    const exitFade = exitFadeRef.current
    if (!section || !world || !viewport) return

    /* --------------------------------------------------------
       Étoiles de fond scintillantes (CSS animations, z-index 1)
       -------------------------------------------------------- */
    if (bgStars) {
      for (let i = 0; i < BG_STAR_COUNT; i++) {
        const star = document.createElement("div")
        star.className = styles.twinkleStar
        star.style.left   = `${(Math.random() * 100).toFixed(2)}%`
        star.style.top    = `${(Math.random() * 100).toFixed(2)}%`
        const size = (0.7 + Math.random() * 1.8).toFixed(2)
        star.style.width  = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDelay    = `${(Math.random() * 7).toFixed(2)}s`
        star.style.animationDuration = `${(2.5 + Math.random() * 4).toFixed(2)}s`
        bgStars.appendChild(star)
      }
    }

    /* --------------------------------------------------------
       État de la caméra (tout en refs — zéro re-render)
       -------------------------------------------------------- */
    const state = {
      cameraZ:     0,
      progress:    0,
      velocity:    0,
      targetSpeed: 0,
      mouseX:      0,
      mouseY:      0,
      lastScrollY: window.scrollY,
    }

    /* --------------------------------------------------------
       Construction de la scène
       -------------------------------------------------------- */
    const items: SceneItem[] = []

    // Textes flottants — styles appliqués inline pour garantir leur rendu
    TEXT_ITEMS.forEach((cfg, i) => {
      const wrapper = document.createElement("div")
      // Layout structurel via CSS module
      wrapper.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        transform-origin: center center;
        display: flex;
        align-items: center;
        justify-content: center;
      `

      const txt = document.createElement("div")
      // Tous les styles visuels inline — aucune dépendance aux classes CSS
      // Opacités réduites — lettres plus éthérées, moins imposantes
      const color = cfg.gold
        ? "rgba(197, 160, 89, 0.48)"
        : "rgba(210, 228, 255, 0.42)"
      const stroke = cfg.gold
        ? "0.5px rgba(197, 160, 89, 0.35)"
        : "0.5px rgba(180, 210, 255, 0.28)"

      txt.style.cssText = `
        font-family: 'Playfair Display', Georgia, serif;
        font-weight: 700;
        font-style: italic;
        font-size: ${cfg.size};
        color: ${color};
        -webkit-text-stroke: ${stroke};
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 0.05em;
        line-height: 1;
        pointer-events: none;
        user-select: none;
        transform: translate(-50%, -50%);
      `
      txt.innerText = cfg.text
      wrapper.appendChild(txt)
      world.appendChild(wrapper)

      items.push({
        el:    wrapper,
        type:  "text",
        x:     cfg.x,
        y:     cfg.y,
        rot:   cfg.rot,
        // -(i+1)*Z_GAP : chaque mot part devant la caméra, bien espacé
        baseZ: -(i + 1) * Z_GAP,
      })
    })

    // Particules (étoiles) — styles inline
    for (let i = 0; i < STAR_COUNT; i++) {
      const el = document.createElement("div")
      el.style.cssText = `
        position: absolute;
        width: 1.5px;
        height: 1.5px;
        background: rgba(200, 228, 255, 0.75);
        transform: translate(-50%, -50%);
        border-radius: 50%;
        box-shadow: 0 0 3px 1px rgba(150, 200, 255, 0.3);
      `
      world.appendChild(el)
      items.push({
        el,
        type:  "star",
        x:     (Math.random() - 0.5) * 3200,
        y:     (Math.random() - 0.5) * 3200,
        rot:   0,
        baseZ: -Math.random() * LOOP_SIZE,
      })
    }

    /* --------------------------------------------------------
       Suivi de la souris
       -------------------------------------------------------- */
    const onMouseMove = (e: MouseEvent) => {
      state.mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouseMove)

    /* --------------------------------------------------------
       Suivi du scroll → cameraZ + vélocité
       -------------------------------------------------------- */
    const onScroll = () => {
      const scrollY     = window.scrollY
      const sectionTop  = section.offsetTop
      const scrollable  = section.offsetHeight - window.innerHeight
      const scrolled    = Math.max(0, scrollY - sectionTop)
      const progress    = Math.min(1, scrolled / scrollable)

      state.cameraZ     = progress * CAM_TOTAL_Z
      state.progress    = progress

      // Vélocité brute (px/event)
      const rawDelta    = scrollY - state.lastScrollY
      state.targetSpeed = rawDelta
      state.lastScrollY = scrollY

      if (coordRef.current) {
        coordRef.current.innerText = scrolled.toFixed(0).padStart(7, "0")
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    /* --------------------------------------------------------
       Boucle RAF — rendu 3D pur, aucun setState
       -------------------------------------------------------- */
    let lastTime = performance.now()
    let rafId: number

    const raf = (time: number) => {
      const delta = Math.max(1, time - lastTime)
      lastTime = time

      // FPS (mise à jour espacée pour lisibilité)
      if (fpsRef.current && time % 12 < 1) {
        fpsRef.current.innerText = String(Math.min(60, Math.round(1000 / delta)))
      }

      // Lissage de la vélocité + amortissement naturel
      state.velocity    += (state.targetSpeed - state.velocity) * 0.1
      state.targetSpeed *= 0.88

      if (velRef.current) {
        velRef.current.innerText = Math.abs(state.velocity).toFixed(2)
      }

      // Inclinaison très douce — quasi imperceptible, juste une impression de profondeur
      const tiltX = state.mouseY * 1.2 - state.velocity * 0.1
      const tiltY = state.mouseX * 1.2
      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

      // FOV stable — pas de warp agressif à grande vitesse
      const fov = 1000 - Math.min(Math.abs(state.velocity) * 2, 150)
      viewport.style.perspective = `${fov}px`

      /* ---- Boucle des items ---- */
      const cameraZ = state.cameraZ

      items.forEach((item) => {
        const relZ = item.baseZ + cameraZ

        // Textes : pas de boucle infinie — chaque mot apparaît UNE SEULE FOIS
        // Étoiles : boucle normale pour remplir l'espace
        const vizZ = item.type === "star"
          ? (() => {
              let v = ((relZ % LOOP_SIZE) + LOOP_SIZE) % LOOP_SIZE
              if (v > 500) v -= LOOP_SIZE
              return v
            })()
          : relZ  // valeur brute, sans modulo

        /* Opacité :
           vizZ ∈ [-3500, -2000] → fondu entrant doux
           vizZ ∈ [-2000,    80] → pleinement visible
           vizZ ∈ [    80,  600] → fondu sortant
           vizZ < -3500 ou > 600 → invisible                */
        let alpha = 1
        if (vizZ < -3500) {
          alpha = 0
        } else if (vizZ < -2000) {
          alpha = (vizZ + 3500) / 1500
        }
        if (vizZ > 80 && item.type !== "star") {
          alpha = 1 - (vizZ - 80) / 520
        }
        if (vizZ > 600 && item.type !== "star") alpha = 0
        if (alpha < 0) alpha = 0

        item.el.style.opacity = String(alpha)

        if (alpha > 0) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`

          if (item.type === "star") {
            // Étirement très doux des étoiles — pas de warp violent
            const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.03, 3))
            trans += ` scale3d(1, 1, ${stretch})`
          } else {
            trans += ` rotateZ(${item.rot}deg)`
          }

          item.el.style.transform = trans
        }
      })

      /* ---- Fondu de sortie (dernier 30 % du scroll) ---- */
      if (exitFade) {
        const fadeOpacity = Math.max(0, (state.progress - 0.7) / 0.3)
        exitFade.style.opacity = String(fadeOpacity)
      }

      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    /* --------------------------------------------------------
       Cleanup
       -------------------------------------------------------- */
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
      while (world.firstChild) world.removeChild(world.firstChild)
      if (bgStars) while (bgStars.firstChild) bgStars.removeChild(bgStars.firstChild)
    }
  }, [])

  /* --------------------------------------------------------
     JSX — structure HTML
     -------------------------------------------------------- */
  return (
    <section ref={sectionRef} className={styles.section} aria-label="Hero animé Charlotte Crescence">
      <div className={styles.sticky}>

        {/* ── Nébuleuse + étoiles de fond ── */}
        <div className={styles.nebula}   aria-hidden="true" />
        <div ref={bgStarsRef} className={styles.bgStars} aria-hidden="true" />

        {/* ── Overlays post-processing ── */}
        <div className={styles.vignette}  aria-hidden="true" />
        <div className={styles.noise}     aria-hidden="true" />
        {/* Liseré permanent bas → indique la continuité du scroll */}
        <div className={styles.exitHint}  aria-hidden="true" />
        {/* Fondu dynamique de sortie — opacity:0 inline garantit l'invisibilité initiale */}
        <div ref={exitFadeRef} className={styles.exitFade} style={{ opacity: 0 }} aria-hidden="true" />

        {/* ── HUD éditorial ── */}
        <div className={styles.hud} aria-hidden="true">
          <div className={styles.hudTop}>
            <span>Charlotte Crescence</span>
            <div className={styles.hudLine} />
            <span>FPS&nbsp;<strong ref={fpsRef} className={styles.hudGold}>60</strong></span>
          </div>

          <div className={styles.centerNav}>
            SCROLL VELOCITY&nbsp;//&nbsp;
            <strong ref={velRef} className={styles.hudGold}>0.00</strong>
          </div>

          <div className={styles.hudBottom}>
            <strong ref={coordRef} className={styles.hudGold}>0000000</strong>
            <div className={styles.hudLine} />
            <span>Art Direction&nbsp;·&nbsp;Digital&nbsp;·&nbsp;Portfolio</span>
          </div>
        </div>

        {/* ── Scène 3D ── */}
        <div ref={viewportRef} className={styles.viewport}>
          <div ref={worldRef} className={styles.world} />
        </div>

      </div>
    </section>
  )
}
