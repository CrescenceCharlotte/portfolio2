import Link from "next/link"
import { HeroShootingStar } from "@/components/HeroShootingStar"
import { LiquidGlass } from "@/components/LiquidGlass"
import { LiquidGlassButton } from "@/components/LiquidGlassButton"
import { CardWork } from "@/components/CardWork"
import { getFeaturedProjects } from "@/lib/content"

/* ── Données expertise (déduites des projets réels) ── */
const EXPERTISE = [
  {
    num:   "01",
    title: "Stratégie &\nCommunication",
    desc:  "Conception de campagnes de communication globales, de la stratégie au déploiement. Sensibilisation, lancement événementiel, social media et print.",
    tags:  ["Stratégie de com.", "Campagne print", "Social media", "Communication événementielle", "Gestion de projet"],
  },
  {
    num:   "02",
    title: "Design &\nIdentité Visuelle",
    desc:  "Création d'identités visuelles cohérentes et de supports graphiques percutants. Direction artistique adaptée à chaque univers de marque.",
    tags:  ["Adobe Illustrator", "Photoshop", "InDesign", "Figma", "Canva", "Direction artistique"],
  },
  {
    num:   "03",
    title: "Vidéo &\nContenu Digital",
    desc:  "Production de contenus vidéo événementiels et digitaux. Du tournage au montage, pour des marques et institutions exigeantes.",
    tags:  ["Production vidéo", "Montage", "Contenu digital", "CapCut", "Réseaux sociaux"],
  },
]

export default function Home() {
  const featuredProjects = getFeaturedProjects(3)
  return (
    <div>

      {/* ══════════════════════════════════════════
          SECTION 1 — Hero 3D
      ══════════════════════════════════════════ */}
      <HeroShootingStar />

      {/* ══════════════════════════════════════════
          SECTION 2 — Expertise en 3 colonnes
      ══════════════════════════════════════════ */}
      <section
        style={{
          position:  "relative",
          padding:   "8rem 1.5rem",
          zIndex:    1,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* En-tête */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontSize:      "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(197, 160, 89, 0.7)",
              marginBottom:  "1rem",
            }}>
              BTS Communication · La Réunion
            </p>
            <h2 style={{
              fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
              fontStyle:     "italic",
              fontWeight:    700,
              fontSize:      "clamp(2rem, 5vw, 3.2rem)",
              color:         "rgba(220, 235, 255, 0.9)",
              margin:        0,
              lineHeight:    1.15,
              letterSpacing: "0.01em",
            }}>
              Mon expertise
            </h2>
            {/* Séparateur or */}
            <div style={{
              width:      "48px",
              height:     "1px",
              background: "rgba(197, 160, 89, 0.4)",
              margin:     "1.8rem auto 0",
            }} />
          </div>

          {/* Grille 3 colonnes */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap:                 "1.5rem",
          }}>
            {EXPERTISE.map((col) => (
              <LiquidGlass key={col.num} variant="panel" style={{ padding: "2.2rem 2rem", cursor: "default" }}>

                {/* Numéro */}
                <p style={{
                  fontFamily:    "var(--font-sans, Inter, sans-serif)",
                  fontSize:      "0.62rem",
                  letterSpacing: "0.22em",
                  color:         "rgba(197, 160, 89, 0.55)",
                  marginBottom:  "1.2rem",
                  marginTop:     0,
                }}>
                  {col.num}
                </p>

                {/* Titre */}
                <h3 style={{
                  fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
                  fontStyle:     "italic",
                  fontWeight:    700,
                  fontSize:      "1.45rem",
                  color:         "rgba(220, 235, 255, 0.92)",
                  whiteSpace:    "pre-line",
                  lineHeight:    1.2,
                  marginTop:     0,
                  marginBottom:  "1.2rem",
                  letterSpacing: "0.01em",
                }}>
                  {col.title}
                </h3>

                {/* Trait séparateur */}
                <div style={{
                  width:        "32px",
                  height:       "1px",
                  background:   "rgba(197, 160, 89, 0.3)",
                  marginBottom: "1.2rem",
                }} />

                {/* Description */}
                <p style={{
                  fontFamily:  "var(--font-sans, Inter, sans-serif)",
                  fontSize:    "0.82rem",
                  lineHeight:  1.7,
                  color:       "rgba(170, 200, 235, 0.65)",
                  marginTop:   0,
                  marginBottom: "1.8rem",
                }}>
                  {col.desc}
                </p>

                {/* Tags compétences */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {col.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily:    "var(--font-sans, Inter, sans-serif)",
                      fontSize:      "0.58rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color:         "rgba(150, 185, 225, 0.5)",
                      border:        "1px solid rgba(180, 210, 255, 0.1)",
                      borderRadius:  "999px",
                      padding:       "0.2rem 0.65rem",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

              </LiquidGlass>
            ))}
          </div>

          {/* CTA vers à propos */}
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <LiquidGlassButton href="/a-propos">
              En savoir plus sur moi
            </LiquidGlassButton>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Réalisations sélectionnées
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          padding:  "6rem 1.5rem 8rem",
          zIndex:   1,
          borderTop: "1px solid rgba(200, 220, 255, 0.05)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* En-tête */}
          <div style={{
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "1.5rem",
            marginBottom:   "4rem",
          }}>
            <div>
              <p style={{
                fontFamily:    "var(--font-sans, Inter, sans-serif)",
                fontSize:      "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color:         "rgba(197, 160, 89, 0.7)",
                marginBottom:  "0.8rem",
                marginTop:     0,
              }}>
                Sélection
              </p>
              <h2 style={{
                fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
                fontStyle:     "italic",
                fontWeight:    700,
                fontSize:      "clamp(2rem, 5vw, 3.2rem)",
                color:         "rgba(220, 235, 255, 0.9)",
                margin:        0,
                lineHeight:    1.15,
              }}>
                Réalisations
              </h2>
            </div>
            <LiquidGlassButton href="/realisations" gold>
              Voir tout le portfolio
            </LiquidGlassButton>
          </div>

          {/* Grille 3 projets */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap:                 "1.5rem",
          }}>
            {featuredProjects.map((p) => {
              const image = Array.isArray(p.featured_image)
                ? (p.featured_image as string[])[0]
                : p.featured_image
              const subtitle = Array.isArray(p.project_type)
                ? (p.project_type as string[])[0]
                : p.project_type
              return (
                <CardWork
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  image={image}
                  subtitle={subtitle}
                  hrefBase="/realisations"
                />
              )
            })}
          </div>

        </div>
      </section>

    </div>
  )
}
