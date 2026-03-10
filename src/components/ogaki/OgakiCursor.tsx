"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  life: number
  isGold: boolean
}

/**
 * Curseur étoile filante pour les pages sombres ogaki
 * Traînée de particules dorées/blanches avec effet de brillance
 */
export function OgakiCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const visibleRef = useRef(false)
  const hoveredRef = useRef(false)
  const animIdRef = useRef<number>(0)

  const drawStar = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, color: string, alpha: number) => {
    const spikes = 4
    const outerRadius = radius
    const innerRadius = radius * 0.4
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.beginPath()
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * i) / spikes - Math.PI / 2
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = particlesRef.current
    const mouse = mouseRef.current

    const onMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      visibleRef.current = true

      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Générer des particules selon la vitesse du mouvement
      const count = Math.min(Math.floor(speed / 2), 8)
      for (let i = 0; i < count; i++) {
        const t = i / Math.max(count, 1)
        const px = mouse.prevX + dx * t + (Math.random() - 0.5) * 6
        const py = mouse.prevY + dy * t + (Math.random() - 0.5) * 6

        particles.push({
          x: px,
          y: py,
          size: Math.random() * 2.5 + 0.8,
          opacity: 1,
          vx: -dx * 0.05 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.05 + (Math.random() - 0.5) * 1.5 - 0.3,
          life: 1,
          isGold: Math.random() > 0.35,
        })
      }

      // Particules scintillantes supplémentaires
      if (speed > 8 && Math.random() > 0.5) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          size: Math.random() * 1.5 + 1.5,
          opacity: 1,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 0.5,
          life: 1,
          isGold: true,
        })
      }
    }

    const onLeave = () => { visibleRef.current = false }
    const onEnter = () => { visibleRef.current = true }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("mouseenter", onEnter)

    // Détection du survol sur les éléments interactifs
    const hoverEnter = () => { hoveredRef.current = true }
    const hoverLeave = () => { hoveredRef.current = false }
    const wrapper = document.querySelector(".ogaki-wrapper")
    let hovEls: NodeListOf<Element> | null = null
    if (wrapper) {
      hovEls = wrapper.querySelectorAll("a, button, input, textarea, [data-cursor-hover]")
      hovEls.forEach((el) => {
        el.addEventListener("mouseenter", hoverEnter)
        el.addEventListener("mouseleave", hoverLeave)
      })
    }

    // Boucle d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les particules (traînée)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life -= 0.018
        p.opacity = p.life * p.life
        p.size *= 0.985

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const color = p.isGold ? "#C5A059" : "#ffffff"

        // Halo lumineux
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = p.opacity * 0.15
        ctx.fill()

        // Particule principale
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity * 0.8
        ctx.fill()
      }

      // Dessiner l'étoile principale au niveau du curseur
      if (visibleRef.current) {
        const starSize = hoveredRef.current ? 14 : 8
        const glowSize = hoveredRef.current ? 28 : 16

        // Halo de l'étoile
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowSize)
        glow.addColorStop(0, "rgba(197, 160, 89, 0.3)")
        glow.addColorStop(0.5, "rgba(197, 160, 89, 0.08)")
        glow.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.globalAlpha = 1
        ctx.fill()

        // Étoile à 4 branches
        drawStar(ctx, mouse.x, mouse.y, starSize, "#C5A059", 0.9)
        // Point central blanc
        drawStar(ctx, mouse.x, mouse.y, starSize * 0.4, "#ffffff", 1)

        // Anneau au survol
        if (hoveredRef.current) {
          ctx.beginPath()
          ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(197, 160, 89, 0.4)"
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.6
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      animIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("resize", resize)
      if (hovEls) {
        hovEls.forEach((el) => {
          el.removeEventListener("mouseenter", hoverEnter)
          el.removeEventListener("mouseleave", hoverLeave)
        })
      }
    }
  }, [drawStar])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-[80] pointer-events-none"
    />
  )
}
