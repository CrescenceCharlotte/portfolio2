"use client"

import { LiquidGlassButton } from "@/components/LiquidGlassButton"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "70vh",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
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
            marginBottom: "1.5rem",
          }}
        >
          Erreur 404
        </p>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "rgba(220, 235, 255, 0.92)",
            lineHeight: 1.05,
            fontStyle: "italic",
            marginBottom: "1.5rem",
          }}
        >
          Page introuvable
        </h1>

        {/* Ligne décorative centrée */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{ height: "1px", width: "4rem", background: "linear-gradient(to right, transparent, rgba(197,160,89,0.4), transparent)" }} />
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontSize: "clamp(0.85rem, 1vw, 1rem)",
            color: "rgba(200, 220, 255, 0.38)",
            lineHeight: 1.7,
            maxWidth: "380px",
            margin: "0 auto 3rem",
          }}
        >
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <LiquidGlassButton href="/" gold>
            Retour à l&apos;accueil
          </LiquidGlassButton>
          <LiquidGlassButton href="/realisations">
            Voir mes réalisations
          </LiquidGlassButton>
        </div>
      </motion.div>
    </section>
  )
}
