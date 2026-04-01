"use client"

import { ScrollReveal } from "@/components/ogaki/ScrollReveal"
import { CardWork } from "@/components/CardWork"
import { motion } from "framer-motion"

interface ProjectData {
  slug: string
  title: string
  featured_image: string
  project_type: string
  date: string
  annonceur?: string
  tools?: string[]
}

interface RealisationsClientProps {
  projects: ProjectData[]
}

export function RealisationsClient({ projects }: RealisationsClientProps) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

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
            Portfolio
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(220, 235, 255, 0.92)",
              lineHeight: 1.1,
              fontStyle: "italic",
              marginBottom: "1.25rem",
            }}
          >
            Mes Réalisations
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
              color: "rgba(200, 220, 255, 0.4)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Découvrez une sélection de projets qui illustrent ma passion pour le design
            et mon expertise dans différents domaines créatifs.
          </p>
        </motion.div>

        {/* Ligne décorative dorée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left", margin: "3.5rem 0 4rem" }}
        >
          <div
            style={{
              height: "1px",
              width: "6rem",
              background: "linear-gradient(to right, rgba(197,160,89,0.6), transparent)",
            }}
          />
        </motion.div>

        {/* Grille de projets */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, i) => {
              const image = Array.isArray(project.featured_image)
                ? (project.featured_image as unknown as string[])[0]
                : project.featured_image
              const projectTypes = Array.isArray(project.project_type)
                ? (project.project_type as unknown as string[])
                : project.project_type ? [project.project_type] : undefined
              return (
                <ScrollReveal key={project.slug} delay={i * 0.12}>
                  <CardWork
                    slug={project.slug}
                    title={project.title}
                    image={image}
                    projectTypes={projectTypes}
                    date={project.date}
                    annonceur={project.annonceur}
                    hrefBase="/realisations"
                  />
                </ScrollReveal>
              )
            })}
          </div>
        ) : (
          <ScrollReveal>
            <div style={{ textAlign: "center", padding: "clamp(3rem, 8vh, 6rem) 0" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  color: "rgba(200,220,255,0.3)",
                }}
              >
                Mes créations seront bientôt ajoutées.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
