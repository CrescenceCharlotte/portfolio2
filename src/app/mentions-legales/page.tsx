"use client"

import { ScrollReveal } from "@/components/ogaki/ScrollReveal"
import { LiquidGlass } from "@/components/LiquidGlass"
import { motion } from "framer-motion"

export default function MentionsLegales() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

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
            Légal
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "rgba(220, 235, 255, 0.92)",
              lineHeight: 1.1,
              fontStyle: "italic",
            }}
          >
            Mentions légales
          </h1>
        </motion.div>

        {/* Ligne décorative */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left", margin: "2.5rem 0 3.5rem" }}
        >
          <div style={{ height: "1px", width: "6rem", background: "linear-gradient(to right, rgba(197,160,89,0.6), transparent)" }} />
        </motion.div>

        <ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {[
              {
                title: "Éditrice du site",
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <p style={bodyStyle}>Charlotte Crescence</p>
                    <p style={bodyStyle}>Étudiante en BTS Communication</p>
                    <p style={bodyStyle}>
                      Email :{" "}
                      <a href="mailto:crescence.charlotte@gmail.com" style={{ color: "#C5A059" }}>
                        crescence.charlotte@gmail.com
                      </a>
                    </p>
                  </div>
                ),
              },
              {
                title: "Hébergement",
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <p style={bodyStyle}>Ce site est hébergé par Netlify, Inc.</p>
                    <p style={bodyStyle}>512 2nd Street, Suite 200 — San Francisco, CA 94107, États-Unis</p>
                    <p style={bodyStyle}>
                      Site web :{" "}
                      <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" style={{ color: "#C5A059" }}>
                        www.netlify.com
                      </a>
                    </p>
                  </div>
                ),
              },
              {
                title: "Propriété intellectuelle",
                content: (
                  <p style={bodyStyle}>
                    L&apos;ensemble du contenu de ce site (textes, images, créations graphiques, photographies)
                    est la propriété exclusive de Charlotte Crescence, sauf mention contraire.
                    Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
                  </p>
                ),
              },
              {
                title: "Données personnelles",
                content: (
                  <p style={bodyStyle}>
                    Les informations recueillies via le formulaire de contact sont uniquement destinées
                    à répondre à vos demandes. Elles ne sont ni stockées dans une base de données,
                    ni transmises à des tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
                    de rectification et de suppression de vos données en contactant{" "}
                    <a href="mailto:crescence.charlotte@gmail.com" style={{ color: "#C5A059" }}>crescence.charlotte@gmail.com</a>.
                  </p>
                ),
              },
              {
                title: "Crédits",
                content: (
                  <p style={bodyStyle}>
                    Site réalisé avec Next.js et hébergé sur Netlify.
                    Les images sont hébergées via Cloudinary.
                  </p>
                ),
              },
            ].map((section) => (
              <LiquidGlass key={section.title} variant="panel" style={{ padding: "2rem 2rem" }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    color: "rgba(220, 235, 255, 0.9)",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  {section.title}
                </h2>
                {section.content}
              </LiquidGlass>
            ))}

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, Inter, sans-serif)",
  fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
  color: "rgba(200, 220, 255, 0.55)",
  lineHeight: 1.7,
  margin: 0,
}
