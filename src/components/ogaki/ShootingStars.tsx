"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  length: number
  duration: number
}

/**
 * Étoiles filantes aléatoires — apparaissent à intervalles irréguliers,
 * traversent l'écran en diagonale avec une traînée dorée puis disparaissent.
 * Utilise des refs pour le compteur afin de ne pas provoquer de re-render
 * sur les composants voisins (ex: Sparkles).
 */
export function ShootingStars({
  minInterval = 3000,
  maxInterval = 8000,
}: {
  minInterval?: number
  maxInterval?: number
}) {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const idRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    function spawnStar() {
      const id = idRef.current++
      const angle = 25 + Math.random() * 30
      const duration = 0.6 + Math.random() * 0.6

      const star: ShootingStar = {
        id,
        startX: Math.random() * 80 + 10,
        startY: Math.random() * 40,
        angle,
        length: 80 + Math.random() * 120,
        duration,
      }

      setStars((prev) => [...prev, star])

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id))
      }, duration * 1000 + 600)
    }

    function schedule() {
      const delay = minInterval + Math.random() * (maxInterval - minInterval)
      timeoutRef.current = setTimeout(() => {
        spawnStar()
        schedule()
      }, delay)
    }

    schedule()
    return () => clearTimeout(timeoutRef.current)
  }, [minInterval, maxInterval])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      <AnimatePresence>
        {stars.map((star) => {
          const rad = (star.angle * Math.PI) / 180
          const dx = Math.cos(rad) * star.length
          const dy = Math.sin(rad) * star.length

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                width: star.length,
                height: 2,
                transformOrigin: "0% 50%",
                rotate: `${star.angle}deg`,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(37,99,168,0.6) 25%, rgba(245,200,66,0.85) 70%, rgba(255,253,231,0.98) 100%)",
                borderRadius: 1,
                boxShadow: "0 0 8px 2px rgba(245,200,66,0.45), 0 0 20px 4px rgba(37,99,168,0.20)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scaleX: [0, 1, 1, 1],
                x: [0, dx],
                y: [0, dy],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: star.duration,
                ease: "easeOut",
                times: [0, 0.1, 0.7, 1],
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
