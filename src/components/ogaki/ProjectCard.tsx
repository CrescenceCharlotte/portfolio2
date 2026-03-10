"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

interface ProjectCardProps {
  slug: string
  title: string
  image?: string
  projectType: string
  date: string
  annonceur?: string
  tools?: string[]
}

/**
 * Carte de projet — cadre luxe lunaire
 * Liseré gradient or/argent, ornements étoilés aux coins, halo clair de lune au survol
 */
export function ProjectCard({
  slug,
  title,
  image,
  projectType,
  date,
  annonceur,
  tools,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const year = new Date(date).getFullYear().toString()

  return (
    <Link href={`/realisations/${slug}`} style={{ textDecoration: "none" }}>
      <motion.article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ cursor: "pointer", display: "block" }}
      >

        {/* ── Cadre principal ── */}
        <div style={{ position: "relative" }}>

          {/* Halo extérieur au survol */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "2px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.12) 0%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 0,
              filter: "blur(6px)",
            }}
          />

          {/* Wrapper gradient border (or/lunaire) */}
          <motion.div
            animate={{
              boxShadow: isHovered
                ? "0 0 0 1px rgba(197,160,89,0.0), 0 12px 50px rgba(5,10,30,0.7), 0 0 40px rgba(197,160,89,0.12), 0 0 80px rgba(100,140,255,0.06)"
                : "0 4px 24px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.7 }}
            style={{
              position: "relative",
              zIndex: 1,
              /* Gradient border trick */
              background: isHovered
                ? "linear-gradient(#030a1c, #030a1c) padding-box, linear-gradient(135deg, rgba(220,235,255,0.55) 0%, rgba(197,160,89,0.85) 30%, rgba(220,235,255,0.35) 50%, rgba(197,160,89,0.85) 70%, rgba(220,235,255,0.55) 100%) border-box"
                : "linear-gradient(#020812, #020812) padding-box, linear-gradient(135deg, rgba(197,160,89,0.5) 0%, rgba(220,235,255,0.2) 50%, rgba(197,160,89,0.5) 100%) border-box",
              border: "1px solid transparent",
              padding: "7px",
              transition: "background 0.7s ease",
            }}
          >

            {/* Liseré intérieur fin */}
            <div style={{
              position: "absolute",
              inset: "4px",
              border: "1px solid rgba(197,160,89,0.1)",
              pointerEvents: "none",
              zIndex: 3,
            }} />

            {/* ── Image du projet ── */}
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#030a1c" }}>

              {image ? (
                <motion.img
                  src={image}
                  alt={title}
                  animate={{ scale: isHovered ? 1.06 : 1 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                /* Placeholder lune — aucune image */
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(160deg, #040d20 0%, #0a1830 50%, #030c1f 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.12 }}>
                    <path d="M24 4C13 4 4 13 4 24C14 24 24 14 24 4Z" fill="#C5A059" />
                    <circle cx="24" cy="24" r="18" stroke="#C5A059" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              )}

              {/* Overlay lune au survol */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at 75% 15%, rgba(140,170,255,0.08) 0%, transparent 55%), linear-gradient(to top, rgba(2,8,18,0.65) 0%, transparent 45%)",
                  pointerEvents: "none",
                }}
              />

              {/* Badge annonceur au survol */}
              {annonceur && (
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -6 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: "absolute", top: "0.9rem", left: "0.9rem" }}
                >
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-sans, Inter, sans-serif)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(220,235,255,0.82)",
                    background: "rgba(2,8,22,0.72)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(197,160,89,0.22)",
                    padding: "0.3rem 0.7rem",
                  }}>
                    {annonceur}
                  </span>
                </motion.div>
              )}

              {/* Outils au bas au survol */}
              {tools && tools.length > 0 && (
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem",
                    background: "linear-gradient(to top, rgba(2,8,18,0.8) 0%, rgba(2,8,18,0.3) 65%, transparent 100%)",
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.48rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(197,160,89,0.65)",
                    marginBottom: "0.4rem",
                  }}>
                    Outils
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {tools.slice(0, 4).map((tool) => (
                      <span key={tool} style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.5rem",
                        letterSpacing: "0.06em",
                        color: "rgba(200,220,255,0.72)",
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "0.18rem 0.45rem",
                        borderRadius: "999px",
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Ornements de coins stellaires ── */}
          <StarCorner position="top-left"     glow={isHovered} />
          <StarCorner position="top-right"    glow={isHovered} />
          <StarCorner position="bottom-left"  glow={isHovered} />
          <StarCorner position="bottom-right" glow={isHovered} />

        </div>

        {/* ── Légende sous le cadre ── */}
        <div style={{ marginTop: "1.4rem", textAlign: "center" }}>
          <motion.p
            animate={{ opacity: isHovered ? 1 : 0.38, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "clamp(0.52rem, 0.7vw, 0.6rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C5A059",
              margin: 0,
            }}
          >
            {projectType}&ensp;✦&ensp;{year}
          </motion.p>
          <motion.h4
            animate={{ color: isHovered ? "rgba(220,235,255,1)" : "rgba(220,235,255,0.75)" }}
            transition={{ duration: 0.4 }}
            className="font-display"
            style={{
              fontSize: "clamp(1.05rem, 1.7vw, 1.4rem)",
              marginTop: "0.45rem",
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </motion.h4>
        </div>

      </motion.article>
    </Link>
  )
}

/* ══════════════════════════════════════════
   Ornement de coin — étoile 4 branches + équerre fine
   ══════════════════════════════════════════ */
function StarCorner({
  position,
  glow,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  glow: boolean
}) {
  const SIZE = 28 /* px — taille de l'ornement */

  const posStyle: React.CSSProperties = {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    zIndex: 4,
    pointerEvents: "none",
  }

  /* Placement exact sur les coins du cadre (padding 7px → coin à ±0) */
  if (position === "top-left")     { posStyle.top    = -1; posStyle.left   = -1 }
  if (position === "top-right")    { posStyle.top    = -1; posStyle.right  = -1 }
  if (position === "bottom-left")  { posStyle.bottom = -1; posStyle.left   = -1 }
  if (position === "bottom-right") { posStyle.bottom = -1; posStyle.right  = -1 }

  /* Rotation selon la position */
  const rotate =
    position === "top-left"     ?   0 :
    position === "top-right"    ?  90 :
    position === "bottom-right" ? 180 :
                                  270

  return (
    <motion.div
      animate={{
        opacity: glow ? 1 : 0.55,
        filter: glow
          ? "drop-shadow(0 0 5px rgba(197,160,89,0.9)) drop-shadow(0 0 12px rgba(197,160,89,0.4))"
          : "drop-shadow(0 0 2px rgba(197,160,89,0.4))",
      }}
      transition={{ duration: 0.55 }}
      style={posStyle}
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", transform: `rotate(${rotate}deg)` }}
      >
        <defs>
          <linearGradient id={`lg-${position}`} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#DFC06A" />
            <stop offset="45%"  stopColor="#C5A059" />
            <stop offset="100%" stopColor="#A07B28" />
          </linearGradient>
        </defs>

        {/* Équerre — branche horizontale */}
        <line x1="6" y1="0" x2="28" y2="0" stroke={`url(#lg-${position})`} strokeWidth="0.8" strokeOpacity="0.7" />
        {/* Équerre — branche verticale */}
        <line x1="0" y1="6" x2="0" y2="28" stroke={`url(#lg-${position})`} strokeWidth="0.8" strokeOpacity="0.7" />

        {/* Étoile 4 branches au coin */}
        {/* Axe nord-sud */}
        <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke={`url(#lg-${position})`} strokeWidth="1.2" strokeLinecap="round" />
        {/* Axe est-ouest */}
        <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke={`url(#lg-${position})`} strokeWidth="1.2" strokeLinecap="round" />
        {/* Diagonales courtes */}
        <line x1="-2.8" y1="-2.8" x2="2.8" y2="2.8" stroke={`url(#lg-${position})`} strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="2.8" y1="-2.8" x2="-2.8" y2="2.8" stroke={`url(#lg-${position})`} strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.6" />
        {/* Point central */}
        <circle cx="0" cy="0" r="1.2" fill="#DFC06A" />
      </svg>
    </motion.div>
  )
}
