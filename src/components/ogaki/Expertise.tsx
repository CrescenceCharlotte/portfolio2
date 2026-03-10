"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles } from "./Sparkles"

const expertiseItems = [
  {
    title: "Stratégie de Communication",
    description:
      "J'analyse les cibles, définis les messages clés et construis des plans de communication cohérents pour maximiser l'impact.",
  },
  {
    title: "Création de Contenu",
    description:
      "Du concept à la réalisation, je conçois des contenus visuels et éditoriaux qui engagent, racontent une histoire et fédèrent une communauté.",
  },
  {
    title: "Événementiel & Digital",
    description:
      "J'imagine et coordonne des expériences mémorables — événements, campagnes digitales et dispositifs de communication innovants.",
  },
]

/**
 * Section Expertise — Chaque item apparaît individuellement au scroll.
 * Hauteur naturelle, pas de sticky. Chaque bloc peut accueillir un fond
 * visuel derrière le texte.
 */
export function Expertise() {
  const labelRef = useRef<HTMLDivElement>(null)
  const labelInView = useInView(labelRef, { once: true, margin: "-15%" })

  return (
    <section id="expertise" className="relative overflow-hidden">
      {/* Fond abstrait sombre */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a2e] via-[#0e1f35] to-[#091525]" />
        <Sparkles count={30} />
      </div>

      <div className="relative z-10" style={{ padding: "clamp(6rem, 15vh, 12rem) var(--ogaki-gutter)" }}>
        {/* Label */}
        <motion.div
          ref={labelRef}
          initial={{ opacity: 0, y: 15 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24"
        >
          <p
            className="text-[#C5A059] font-sans uppercase"
            style={{
              fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
              letterSpacing: "0.35em",
            }}
          >
            Mon Expertise
          </p>
        </motion.div>

        {/* Items — 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {expertiseItems.map((item, i) => (
            <ExpertiseItem key={i} index={i} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Bloc d'expertise individuel — apparaît quand il entre dans le viewport.
 * Wrapper .expertise-item-wrapper prêt à recevoir un fond visuel.
 */
function ExpertiseItem({
  index,
  title,
  description,
}: {
  index: number
  title: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <div ref={ref} className="expertise-item-wrapper relative">
      {/* ← Emplacement pour un futur fond / image derrière le texte */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10"
      >
        <span className="text-[#C5A059]/20 font-sans text-xs tracking-wider">
          0{index + 1}
        </span>
        <h3
          className="font-display text-white mt-3 leading-[1.1]"
          style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
        >
          {title}
        </h3>
        <p
          className="text-[white]/42 font-sans mt-4 leading-relaxed"
          style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
        >
          {description}
        </p>
      </motion.div>
    </div>
  )
}
