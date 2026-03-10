"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

/**
 * Champ d'étoiles dorées scintillantes
 * Génère des étoiles à positions aléatoires qui apparaissent / disparaissent
 * en boucle avec des timings décalés pour un effet naturel
 */
export function Sparkles({ count = 25 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Générer les étoiles initiales
    const generated: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 1.5,
    }))
    setSparkles(generated)

    // Régénérer périodiquement les positions pour que ça reste vivant
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((s) => ({
          ...s,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1.5,
        }))
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={`${sparkle.id}-${sparkle.x.toFixed(2)}`}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: "#C5A059",
              boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.size * 1.5}px rgba(245, 200, 66, 0.40), 0 0 ${sparkle.size * 8}px ${sparkle.size * 3}px rgba(37, 99, 168, 0.15)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.2, 0],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3 + 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
