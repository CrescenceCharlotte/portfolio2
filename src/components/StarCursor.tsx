"use client"

import { useEffect, useRef } from "react"
import styles from "./StarCursor.module.css"

/**
 * StarCursor — Remplace le curseur natif par une étoile filante animée.
 * - L'étoile (✦) suit exactement la position du curseur
 * - La queue (comète) suit avec du lag et pointe dans la direction opposée au mouvement
 * - Le halo diffus suit encore plus doucement pour un effet de traîné lumineux
 * - Désactivé sur les appareils tactiles (pointer: coarse)
 */
export function StarCursor() {
  const starRef  = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const star  = starRef.current
    const trail = trailRef.current
    if (!star || !trail) return

    /* Masque le curseur natif sur tous les éléments */
    const styleEl = document.createElement("style")
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }"
    document.head.appendChild(styleEl)

    /* ── État ── */
    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2

    // Queue : suit avec lag (interpolation exponentielle)
    let trailX = mouseX
    let trailY = mouseY
    let prevTrailX = mouseX
    let prevTrailY = mouseY

    let trailAngle = 0
    let rafId: number

    /* true quand la souris survole une section avec data-hide-star-cursor */
    let hidden = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY)
      hidden = el?.closest("[data-hide-star-cursor]") !== null
    }

    const raf = () => {
      if (hidden) {
        star.style.opacity  = "0"
        trail.style.opacity = "0"
        rafId = requestAnimationFrame(raf)
        return
      }

      /* ── Étoile : position exacte du curseur ── */
      star.style.opacity   = ""
      star.style.transform = `translate(${mouseX}px, ${mouseY}px)`

      /* ── Queue : suit le curseur avec lag ── */
      trailX += (mouseX - trailX) * 0.16
      trailY += (mouseY - trailY) * 0.16

      const dx    = trailX - prevTrailX
      const dy    = trailY - prevTrailY
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Met à jour l'angle seulement si le mouvement est notable
      if (speed > 0.15) {
        trailAngle = Math.atan2(dy, dx) * (180 / Math.PI)
      }

      // Longueur et opacité de la queue proportionnelles à la vitesse
      const trailLength  = Math.min(12 + speed * 4.5, 100)
      const trailOpacity = Math.min(speed * 0.11, 0.92)

      // La queue part de la position de l'étoile et pointe en sens inverse du mouvement
      trail.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${trailAngle + 180}deg)`
      trail.style.width     = `${trailLength}px`
      trail.style.opacity   = String(trailOpacity)

      prevTrailX = trailX
      prevTrailY = trailY

      rafId = requestAnimationFrame(raf)
    }

    window.addEventListener("mousemove", onMouseMove)
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
      document.head.removeChild(styleEl)
    }
  }, [])

  return (
    <>
      <div ref={trailRef} className={styles.trail} aria-hidden="true" />
      <div ref={starRef}  className={styles.star}  aria-hidden="true">
        <div className={styles.starShape} />
      </div>
    </>
  )
}
