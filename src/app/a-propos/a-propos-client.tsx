"use client"

import { ScrollReveal } from "@/components/ogaki/ScrollReveal"
import { LiquidGlass } from "@/components/LiquidGlass"
import { LiquidGlassButton } from "@/components/LiquidGlassButton"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

interface AProposClientProps {
  title: string
  profileImage?: string
  skills?: string[]
  body: string
}

export function AProposClient({ title, profileImage, skills, body }: AProposClientProps) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(197, 160, 89, 0.75)",
              marginBottom: "1rem",
            }}
          >
            À propos
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(220, 235, 255, 0.92)",
              lineHeight: 1.1,
              fontStyle: "italic",
            }}
          >
            {title}
          </h1>
        </motion.div>

        {/* Ligne décorative dorée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left", margin: "3rem 0" }}
        >
          <div
            style={{
              height: "1px",
              width: "6rem",
              background: "linear-gradient(to right, rgba(197,160,89,0.6), transparent)",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Colonne gauche — photo + compétences */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              {/* Photo de profil */}
              <LiquidGlass
                variant="card"
                style={{ marginBottom: "2rem", overflow: "hidden" }}
              >
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Charlotte Crescence"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "320px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #0d1117 0%, #1a2332 70%, #0f1923 100%)",
                      }}
                    >
                      <span
                        className="font-display"
                        style={{ fontSize: "clamp(4rem, 8vw, 6rem)", color: "rgba(220,235,255,0.06)", fontStyle: "italic" }}
                      >
                        C
                      </span>
                    </div>
                  )}
                </div>
              </LiquidGlass>
            </ScrollReveal>

            {/* Compétences */}
            {skills && skills.length > 0 && (
              <ScrollReveal delay={0.15}>
                <LiquidGlass variant="panel" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans, Inter, sans-serif)",
                      fontSize: "clamp(0.55rem, 0.75vw, 0.65rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(197, 160, 89, 0.65)",
                      marginBottom: "1rem",
                    }}
                  >
                    Compétences
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: "var(--font-sans, Inter, sans-serif)",
                          fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)",
                          letterSpacing: "0.1em",
                          color: "rgba(170, 200, 235, 0.6)",
                          border: "1px solid rgba(180, 210, 255, 0.1)",
                          borderRadius: "999px",
                          padding: "0.3rem 0.85rem",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </LiquidGlass>
              </ScrollReveal>
            )}

            {/* Boutons d'action */}
            <ScrollReveal delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <LiquidGlassButton href="/contact" gold>
                  Me contacter
                </LiquidGlassButton>
                <LiquidGlassButton href="/cv-charlotte-crescence.pdf">
                  Télécharger mon CV
                </LiquidGlassButton>
                <LiquidGlassButton href="/realisations">
                  Voir mes réalisations
                </LiquidGlassButton>

                {/* Réseaux sociaux */}
                <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", paddingTop: "0.75rem" }}>
                  <Link
                    href="https://www.linkedin.com/in/charlotte-crescence"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.3s" }}
                    className="hover:text-[#C5A059]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/charlotte.crescence"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.3s" }}
                    className="hover:text-[#C5A059]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Colonne droite — contenu principal */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="prose max-w-none">
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
