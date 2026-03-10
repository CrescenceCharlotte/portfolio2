"use client"

import { ScrollReveal } from "@/components/ogaki/ScrollReveal"
import { LiquidGlass } from "@/components/LiquidGlass"
import { LiquidGlassButton } from "@/components/LiquidGlassButton"
import { motion } from "framer-motion"

export function ContactClient() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
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
            Contact
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "rgba(220, 235, 255, 0.92)",
              lineHeight: 1.1,
              fontStyle: "italic",
              marginBottom: "1.25rem",
            }}
          >
            Envie de donner vie à votre projet ?
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "clamp(0.85rem, 1vw, 1rem)",
              color: "rgba(200, 220, 255, 0.45)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 4rem",
            }}
          >
            Remplissez le formulaire ci-dessous. Je vous répondrai rapidement
            pour discuter de votre projet et trouver la meilleure approche créative.
          </p>
        </motion.div>

        {/* Ligne décorative centrée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center", marginBottom: "4rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(200,220,255,0.06)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans, Inter, sans-serif)",
                fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(200,220,255,0.15)",
              }}
            >
              Formulaire de contact
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(200,220,255,0.06)" }} />
          </div>
        </motion.div>

        {/* Formulaire dans un panneau glass */}
        <ScrollReveal delay={0.2}>
          <LiquidGlass variant="panel" style={{ padding: "clamp(2rem, 4vw, 3rem)" }}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p style={{ display: "none" }}>
                <label>Ne pas remplir: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="contact-name" className="sr-only">Votre nom</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  required
                  className="ogaki-input"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Votre email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  required
                  className="ogaki-input"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Votre message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Votre message"
                  rows={5}
                  required
                  className="ogaki-input resize-none"
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
                <LiquidGlassButton type="submit" gold>
                  Envoyer le message
                </LiquidGlassButton>
              </div>
            </form>
          </LiquidGlass>
        </ScrollReveal>
      </div>
    </section>
  )
}
