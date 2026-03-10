"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, useRef, useCallback } from "react"

// Particule individuelle
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
  twinkleSpeed: number
  twinklePhase: number
}

// Palette dorée / étoilée
const STAR_COLORS = [
  "#FFD700",
  "#FFFBE6",
  "#FFF8DC",
  "#FFFFFF",
  "#FFE4B5",
  "#F5DEB3",
  "#FFFACD",
  "#B8860B",
]

function createParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 1.8 + 0.4
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.3,
    size: Math.random() * 3.5 + 0.8,
    opacity: 0,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    life: -Math.floor(Math.random() * 15), // décalage d'apparition
    maxLife: Math.random() * 55 + 35,
    twinkleSpeed: Math.random() * 0.18 + 0.06,
    twinklePhase: Math.random() * Math.PI * 2,
  }
}

// Dessine une étoile à 4 branches avec halo lumineux
function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  color: string
) {
  if (opacity < 0.01) return
  ctx.save()
  ctx.globalAlpha = opacity

  // Halo lumineux
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 5)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, "transparent")
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, size * 5, 0, Math.PI * 2)
  ctx.fill()

  // Étoile à 4 branches
  ctx.beginPath()
  const spikes = 4
  const outer = size
  const inner = size * 0.35
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i * Math.PI) / spikes - Math.PI / 2
    const px = x + Math.cos(a) * r
    const py = y + Math.sin(a) * r
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()

  // Point central blanc
  ctx.beginPath()
  ctx.arc(x, y, size * 0.25, 0, Math.PI * 2)
  ctx.fillStyle = "#FFFFFF"
  ctx.fill()

  ctx.restore()
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const isFirstMount = useRef(true)

  // Déclenche l'animation à chaque changement de route (sauf au premier rendu)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    setIsAnimating(true)
  }, [pathname])

  const runAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Taille du canvas = taille de la fenêtre (x2 pour la résolution retina)
    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // Création des particules
    const count = Math.min(200, Math.floor((w * h) / 5000))
    const particles: Particle[] = Array.from({ length: count }, () =>
      createParticle(w, h)
    )

    let frame = 0
    const totalFrames = 75 // ~1.25s à 60fps

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      const progress = frame / totalFrames

      // Voile sombre subtil pour mettre les étoiles en valeur
      const veilOpacity =
        progress < 0.15
          ? progress / 0.15
          : progress > 0.65
            ? (1 - progress) / 0.35
            : 1
      ctx.fillStyle = `rgba(10, 10, 30, ${veilOpacity * 0.35})`
      ctx.fillRect(0, 0, w, h)

      // Mise à jour et dessin des particules
      for (const p of particles) {
        p.life++
        if (p.life < 0) continue // pas encore apparue

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.995 // légère décélération
        p.vy *= 0.995

        // Fondu d'apparition / disparition
        const lifeRatio = p.life / p.maxLife
        if (lifeRatio < 0.2) {
          p.opacity = lifeRatio / 0.2
        } else if (lifeRatio > 0.65) {
          p.opacity = Math.max(0, (1 - lifeRatio) / 0.35)
        } else {
          p.opacity = 1
        }

        // Scintillement
        const twinkle =
          Math.sin(p.life * p.twinkleSpeed + p.twinklePhase) * 0.35 + 0.65
        p.opacity *= twinkle

        // Fondu global de sortie
        if (progress > 0.6) {
          p.opacity *= (1 - progress) / 0.4
        }

        drawStar(ctx, p.x, p.y, p.size, Math.max(0, p.opacity), p.color)
      }

      frame++

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, w, h)
        setIsAnimating(false)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Lance l'animation quand isAnimating passe à true
  useEffect(() => {
    if (isAnimating) {
      const cleanup = runAnimation()
      return cleanup
    }
  }, [isAnimating, runAnimation])

  return (
    <div className="relative">
      {isAnimating && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[60] pointer-events-none"
        />
      )}
      {children}
    </div>
  )
}
