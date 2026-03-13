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

const LANGUES = ["Français", "Anglais", "Espagnol", "Créole"]

const PARCOURS: {
  type: "experience" | "formation"
  period: string
  title: string
  company: string
  location: string
  contract: string
  items: string[]
}[] = [
  {
    type: "experience",
    period: "2025 — 2026",
    title: "Chargée de communication",
    company: "AEROLIK.OI",
    location: "La Réunion",
    contract: "Alternance",
    items: [
      "Création de contenus digitaux",
      "Gestion des réseaux sociaux",
      "Accueil & assistance client",
    ],
  },
  {
    type: "formation",
    period: "2024 — 2026",
    title: "BTS Communication",
    company: "École du numérique",
    location: "Saint-Denis, La Réunion",
    contract: "Alternance · Mention Très bien",
    items: [
      "Contribuer à l'élaboration et au pilotage de la stratégie de communication",
      "Concevoir et mettre en œuvre des solutions de communication",
    ],
  },
  {
    type: "experience",
    period: "2024 — 2025",
    title: "Chargée de communication",
    company: "Une Hair Nouvelle",
    location: "La Réunion",
    contract: "Alternance",
    items: [
      "Création de contenus digitaux pour les réseaux sociaux",
      "Accueil & assistance client",
      "Développement du sens du contact, de l'écoute et du service client",
    ],
  },
  {
    type: "formation",
    period: "2023 — 2024",
    title: "Baccalauréat STMG",
    company: "Lycée Jean Hinglo",
    location: "Le Port, La Réunion",
    contract: "Spécialité Marketing · Mention Bien",
    items: [],
  },
  {
    type: "experience",
    period: "2020 — 2021",
    title: "Stage d'observation",
    company: "Grand Port Maritime de la Réunion",
    location: "La Réunion",
    contract: "Stage",
    items: [
      "Découverte du fonctionnement d'un établissement public portuaire",
      "Observation des missions liées à la logistique et à l'organisation interne",
      "Gestion documentaire",
    ],
  },
  {
    type: "formation",
    period: "2020 — 2021",
    title: "Brevet des collèges",
    company: "Collège Titan",
    location: "Le Port, La Réunion",
    contract: "",
    items: [],
  },
]

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

        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Colonne gauche — photo + compétences + langues */}
          <div className="lg:col-span-1">
            <ScrollReveal>
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

            {/* Langues */}
            <ScrollReveal delay={0.2}>
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
                  Langues
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {LANGUES.map((langue) => (
                    <span
                      key={langue}
                      style={{
                        fontFamily: "var(--font-sans, Inter, sans-serif)",
                        fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
                        letterSpacing: "0.08em",
                        color: "rgba(200, 220, 250, 0.7)",
                      }}
                    >
                      {langue}
                    </span>
                  ))}
                </div>
              </LiquidGlass>
            </ScrollReveal>

            {/* Boutons d'action */}
            <ScrollReveal delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <LiquidGlassButton href="/contact" gold>
                  Me contacter
                </LiquidGlassButton>
                <LiquidGlassButton href="/images/Cv%20a%20jour%20.pdf">
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
              <div
                style={{
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
                  color: "rgba(200, 220, 250, 0.75)",
                  lineHeight: 1.85,
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                }}
                className="prose prose-invert max-w-none
                  prose-headings:font-display prose-headings:italic prose-headings:font-normal
                  prose-headings:text-[rgba(220,235,255,0.88)] prose-headings:tracking-tight
                  prose-h2:text-[clamp(1.3rem,2.2vw,1.8rem)] prose-h2:mb-4 prose-h2:mt-10
                  prose-strong:text-[rgba(197,160,89,0.85)] prose-strong:font-normal
                  prose-p:text-[rgba(190,215,245,0.68)] prose-p:leading-relaxed
                  prose-li:text-[rgba(190,215,245,0.65)] prose-ol:pl-5"
              >
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Section Parcours (timeline) ── */}
        <ScrollReveal delay={0.1}>
          <div style={{ marginTop: "6rem" }}>

            {/* Titre section */}
            <div style={{ marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
                  fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(197, 160, 89, 0.75)",
                  marginBottom: "0.75rem",
                }}
              >
                Parcours
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "rgba(220, 235, 255, 0.88)",
                  lineHeight: 1.15,
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Expériences & Formations
              </h2>
              <div
                style={{
                  height: "1px",
                  width: "4rem",
                  background: "linear-gradient(to right, rgba(197,160,89,0.5), transparent)",
                  marginTop: "1.5rem",
                }}
              />
            </div>

            {/* Légende */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
              {[
                { label: "Expérience professionnelle", color: "rgba(197, 160, 89, 0.75)" },
                { label: "Formation", color: "rgba(120, 170, 230, 0.7)" },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "var(--font-sans, Inter, sans-serif)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(180, 200, 235, 0.45)",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: "2rem" }}>

              {/* Ligne verticale gauche */}
              <div
                style={{
                  position: "absolute",
                  left: "5px",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  background: "linear-gradient(to bottom, transparent, rgba(197,160,89,0.25) 5%, rgba(197,160,89,0.18) 95%, transparent)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {PARCOURS.map((item, i) => {
                  const isExp = item.type === "experience"
                  const accentColor = isExp ? "rgba(197, 160, 89, 0.8)" : "rgba(120, 170, 230, 0.75)"
                  const badgeBg = isExp ? "rgba(197,160,89,0.08)" : "rgba(100,150,220,0.08)"
                  const badgeBorder = isExp ? "rgba(197,160,89,0.2)" : "rgba(100,150,220,0.18)"

                  return (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                        {/* Dot */}
                        <div style={{ paddingTop: "0.9rem", flexShrink: 0, marginLeft: "-2rem" }}>
                          <div style={{
                            width: "11px", height: "11px", borderRadius: "50%",
                            background: accentColor,
                            boxShadow: `0 0 9px ${accentColor}`,
                          }} />
                        </div>
                        <TimelineCard item={item} accentColor={accentColor} badgeBg={badgeBg} badgeBorder={badgeBorder} />
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

function TimelineCard({
  item,
  accentColor,
  badgeBg,
  badgeBorder,
}: {
  item: typeof PARCOURS[number]
  accentColor: string
  badgeBg: string
  badgeBorder: string
}) {
  return (
    <div style={{ maxWidth: "560px", width: "100%" }}>
      <LiquidGlass variant="panel" style={{ padding: "1.5rem 1.75rem" }}>
        {/* Période + badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 500,
          }}>
            {item.period}
          </span>
          <span style={{
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: accentColor,
            background: badgeBg,
            border: `1px solid ${badgeBorder}`,
            borderRadius: "999px",
            padding: "0.18rem 0.65rem",
          }}>
            {item.type === "experience" ? "Expérience" : "Formation"}
          </span>
        </div>

        {/* Titre */}
        <p style={{
          fontFamily: "var(--font-serif, 'Playfair Display', serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
          color: "rgba(220, 235, 255, 0.88)",
          marginBottom: "0.3rem",
          lineHeight: 1.3,
        }}>
          {item.title}
        </p>

        {/* Entreprise / École */}
        <p style={{
          fontFamily: "var(--font-sans, Inter, sans-serif)",
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          color: "rgba(170, 200, 235, 0.65)",
          marginBottom: item.contract ? "0.25rem" : (item.items.length > 0 ? "1rem" : 0),
        }}>
          {item.company}
          {item.location && (
            <span style={{ color: "rgba(140, 170, 210, 0.4)", marginLeft: "0.4rem" }}>
              · {item.location}
            </span>
          )}
        </p>

        {/* Contrat / mention */}
        {item.contract && (
          <p style={{
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "rgba(140, 170, 210, 0.45)",
            marginBottom: item.items.length > 0 ? "1rem" : 0,
          }}>
            {item.contract}
          </p>
        )}

        {/* Missions */}
        {item.items.length > 0 && (
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}>
            {item.items.map((mission, j) => (
              <li key={j} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
              }}>
                <span style={{ color: accentColor, fontSize: "0.5rem", marginTop: "0.35rem", flexShrink: 0 }}>◆</span>
                <span style={{
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  color: "rgba(180, 205, 240, 0.55)",
                }}>
                  {mission}
                </span>
              </li>
            ))}
          </ul>
        )}
      </LiquidGlass>
    </div>
  )
}
