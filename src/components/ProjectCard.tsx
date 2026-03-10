"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { LiquidGlass } from "./LiquidGlass"

type ProjectCardProps = {
  slug:      string
  title:     string
  excerpt:   string
  image:     string
  hrefBase?: string
}

export function ProjectCard({
  slug,
  title,
  excerpt,
  image,
  hrefBase = "/realisations",
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`${hrefBase}/${encodeURIComponent(slug)}`}
      className="group relative block"
      style={{ height: "500px", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image de fond avec zoom ── */}
      <motion.div
        style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "1.25rem" }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Gradient noir vers le bas */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(0,2,12,0.85) 0%, rgba(0,2,12,0.25) 55%, transparent 100%)",
          borderRadius: "1.25rem",
          zIndex:     1,
        }}
      />

      {/* ── Panel Liquid Glass en bas ── */}
      <motion.div
        style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem", zIndex: 2 }}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <LiquidGlass variant="panel">

          {/* Titre */}
          <motion.h3
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
              fontStyle:     "italic",
              fontWeight:    700,
              fontSize:      "clamp(1.3rem, 3vw, 1.8rem)",
              color:         "rgba(220, 235, 255, 0.95)",
              margin:        0,
              lineHeight:    1.15,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </motion.h3>

          {/* Extrait */}
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.04 }}
            style={{
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontWeight:    400,
              fontSize:      "0.82rem",
              lineHeight:    1.6,
              color:         "rgba(180, 210, 240, 0.75)",
              marginTop:     "0.5rem",
              marginBottom:  0,
              display:       "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow:      "hidden",
            }}
          >
            {excerpt}
          </motion.p>

          {/* Indicateur Voir le projet */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              marginTop:     "0.85rem",
              display:       "flex",
              alignItems:    "center",
              gap:           "0.5rem",
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontSize:      "0.65rem",
              fontWeight:    400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "rgba(197, 160, 89, 0.9)",
            }}
          >
            <span>Voir le projet</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

        </LiquidGlass>
      </motion.div>

      {/* Bordure lumineuse au survol */}
      <motion.div
        style={{
          position:       "absolute",
          inset:          0,
          borderRadius:   "1.25rem",
          pointerEvents:  "none",
          zIndex:         3,
        }}
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(197,160,89,0.25)"
            : "inset 0 0 0 1px rgba(180,210,255,0.07)",
        }}
        transition={{ duration: 0.35 }}
      />
    </Link>
  )
}
