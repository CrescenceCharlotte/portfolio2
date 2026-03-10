"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { FallingTextDecay } from "./FallingTextDecay"

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  heroImage?: string
}

/**
 * Section Hero — Nom affiché en format prestige luxury :
 *   prénom en petites capitales dorées, nom massif avec grand letter-spacing
 * Animations :
 *   1. Entrée : fade-in + scale-up au chargement (Framer Motion)
 *   2. FallingTextDecay GSAP : déclenché automatiquement au premier scroll
 *      — les lettres tombent avec rotation aléatoire et disparaissent
 * Lueur dorée atmosphérique en fond
 */
export function Hero({
  title,
  subtitle,
  description,
  ctaText = "Découvrir mes projets",
  heroImage,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Déclenchement réversible du FallingTextDecay au scroll
  const [startFall, setStartFall] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.08 && !startFall) {
        setStartFall(true)
      } else if (v <= 0.03 && startFall) {
        setStartFall(false)
      }
    })
    return unsubscribe
  }, [scrollYProgress, startFall])

  // Parallaxe pour le sous-titre, description, CTA
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Séparer prénom et nom pour l'affichage prestige
  const words = title.trim().split(/\s+/)
  const hasMultipleWords = words.length > 1
  const firstName = hasMultipleWords ? words.slice(0, -1).join(" ") : null
  const lastName = hasMultipleWords ? words[words.length - 1] : title

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center"
      style={{ paddingTop: "clamp(5rem, 14vh, 10rem)" }}
    >
      {/* Image hero en fond (si disponible) */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a2e] via-transparent to-[#0b1a2e]" />
        </div>
      )}

      {/* Contenu Hero */}
      <div className="relative text-center w-full" style={{ padding: "0 var(--ogaki-gutter)" }}>
        {/* Titre complet — même taille pour prénom et nom, centré */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-white font-bold select-none uppercase leading-[0.9]" style={{ textShadow: "0 0 60px rgba(245,200,66,0.15), 0 0 120px rgba(37,99,168,0.10)" }}>
            {firstName && (
              <FallingTextDecay
                text={firstName}
                trigger={startFall}
                style={{
                  fontSize: "clamp(2.5rem, 10vw, 9rem)",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "clamp(0.25rem, 0.8vw, 0.5rem)",
                }}
              />
            )}
            <FallingTextDecay
              text={lastName}
              trigger={startFall}
              style={{
                fontSize: "clamp(2.5rem, 10vw, 9rem)",
                letterSpacing: "0.15em",
                display: "block",
              }}
            />
          </h1>
        </motion.div>

        {/* Sous-titre, description, CTA — décalés vers le bas + parallaxe au scroll */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity, marginTop: "clamp(3rem, 6vw, 5rem)" }}
        >
          {subtitle && (
            <SubtitleWithSparkles subtitle={subtitle} />
          )}

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                className="text-[white]/32 font-sans mt-5 max-w-2xl mx-auto leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)" }}
              >
                {description}
              </p>
            </motion.div>
          )}

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
          >
            <Link
              href="/realisations"
              className="text-[#C5A059] border border-[#C5A059]/35 hover:border-[#C5A059]/75 font-sans uppercase transition-all duration-500 hover:bg-[#C5A059]/6"
              style={{
                fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
                letterSpacing: "0.2em",
                padding:
                  "clamp(0.875rem, 1.3vw, 1.1rem) clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              {ctaText}
            </Link>
            <Link
              href="/a-propos"
              className="text-[white]/30 hover:text-[white]/60 font-sans uppercase transition-colors duration-400"
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
                letterSpacing: "0.2em",
              }}
            >
              En savoir plus sur moi
            </Link>
          </motion.div>

          {/* Ligne décorative dorée animée */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="origin-top mx-auto"
            style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            <div className="w-px h-20 mx-auto bg-gradient-to-b from-[#C5A059]/55 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

interface SparkleParticle {
  id: number
  x: number
  y: number
  size: number
  angle: number
  distance: number
  duration: number
  delay: number
}

function generateSparkles(count: number): SparkleParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8,
    distance: Math.random() * 60 + 30,
    duration: Math.random() * 0.6 + 0.6,
    delay: Math.random() * 0.4,
  }))
}

function SubtitleWithSparkles({ subtitle }: { subtitle: string }) {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([])
  const [hasAppeared, setHasAppeared] = useState(false)

  const triggerSparkles = useCallback(() => {
    if (hasAppeared) return
    setHasAppeared(true)
    setSparkles(generateSparkles(18))
    // Deuxième vague plus subtile
    setTimeout(() => setSparkles((prev) => [...prev, ...generateSparkles(10).map(s => ({ ...s, id: s.id + 100, delay: s.delay + 0.3, distance: s.distance * 1.4, size: s.size * 0.7 }))]), 200)
  }, [hasAppeared])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={triggerSparkles}
      className="relative inline-block"
    >
      {/* Particules d'étincelles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: s.size,
              height: s.size,
              backgroundColor: "#C5A059",
              boxShadow: `0 0 ${s.size * 4}px ${s.size * 1.5}px rgba(245, 200, 66, 0.55)`,
            }}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos(s.angle) * s.distance,
              y: Math.sin(s.angle) * s.distance,
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Flash lumineux au moment de l'apparition */}
      {hasAppeared && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245, 200, 66, 0.28) 0%, transparent 70%)",
          }}
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      )}

      <p
        className="text-[white]/35 font-sans uppercase relative z-10"
        style={{
          fontSize: "clamp(0.65rem, 1vw, 0.875rem)",
          letterSpacing: "0.3em",
          marginTop: "clamp(1rem, 2vw, 1.75rem)",
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  )
}
