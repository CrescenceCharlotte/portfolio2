"use client"

import { ScrollReveal } from "@/components/ogaki/ScrollReveal"
import { LiquidGlass } from "@/components/LiquidGlass"
import { LiquidGlassButton } from "@/components/LiquidGlassButton"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { ProjectGallery } from "@/components/ui/project-gallery"
import { ProjectEvidenceList } from "@/components/ui/project-evidence"
import type { ProjectEvidence } from "@/lib/content"

interface ProjectDataForClient {
  slug: string
  title: string
  excerpt: string
  date: string
  annonceur?: string
  contexte: string
  contexte_autre?: string
  project_type: string
  tools: string[]
  featured_image: string
  gallery: { image: string }[]
  duration?: string
  status: string
  pdf_portfolio?: string
  project_url?: string
  cibles?: string
  strategie_creative?: string
  objectifs_cognitifs?: string[]
  objectifs_affectifs?: string[]
  objectifs_conatifs?: string[]
  preuves?: ProjectEvidence[]
  body: string
}

interface RealisationDetailClientProps {
  project: ProjectDataForClient
  previousProject: { slug: string; title: string } | null
  nextProject: { slug: string; title: string } | null
}

export function RealisationDetailClient({
  project,
  previousProject,
  nextProject,
}: RealisationDetailClientProps) {
  const year = new Date(project.date).getFullYear().toString()
  const formattedDate = new Date(project.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(3rem, 8vh, 6rem) var(--ogaki-gutter)",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Retour aux réalisations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "3rem" }}
        >
          <Link
            href="/realisations"
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(200,220,255,0.3)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "color 0.3s",
            }}
            className="hover:text-[#C5A059]"
          >
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "block" }} />
            Retour aux réalisations
          </Link>
        </motion.div>

        {/* En-tête du projet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          {/* Métadonnées */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-sans, Inter, sans-serif)",
                fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(197, 160, 89, 0.85)",
              }}
            >
              {project.project_type}
            </span>
            <span style={{ width: "1.5rem", height: "1px", background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)", color: "rgba(200,220,255,0.3)" }}>
              {year}
            </span>
            {project.annonceur && (
              <>
                <span style={{ width: "1.5rem", height: "1px", background: "rgba(255,255,255,0.15)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)", color: "rgba(200,220,255,0.3)" }}>
                  {project.annonceur}
                </span>
              </>
            )}
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "rgba(220, 235, 255, 0.95)",
              lineHeight: 1.05,
              fontStyle: "italic",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              color: "rgba(200,220,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "640px",
              marginTop: "1.5rem",
            }}
          >
            {project.excerpt}
          </p>

          {/* Boutons d'action */}
          {(project.project_url || project.pdf_portfolio) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}>
              {project.project_url && (
                <LiquidGlassButton href={project.project_url} gold>
                  Voir le projet en ligne
                </LiquidGlassButton>
              )}
              {project.pdf_portfolio && (
                <LiquidGlassButton href={project.pdf_portfolio}>
                  Télécharger le PDF
                </LiquidGlassButton>
              )}
            </div>
          )}
        </motion.div>

        {/* Image principale */}
        {project.featured_image && (
          <ScrollReveal>
            <div style={{ position: "relative", marginBottom: "5rem", overflow: "hidden" }}>
              <img
                src={project.featured_image}
                alt={project.title}
                style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(197,160,89,0.1)",
                pointerEvents: "none",
              }} />
            </div>
          </ScrollReveal>
        )}

        {/* Contenu principal en 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Colonne principale */}
          <div className="lg:col-span-2">

            {/* Corps du projet (Markdown) */}
            <ScrollReveal>
              <div className="prose max-w-none" style={{ marginBottom: "4rem" }}>
                <ReactMarkdown>{project.body}</ReactMarkdown>
              </div>
            </ScrollReveal>

            {/* Galerie d'images */}
            {project.gallery && project.gallery.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div style={{ marginBottom: "4rem" }}>
                  <SectionLabel>Galerie</SectionLabel>
                  <ProjectGallery
                    gallery={project.gallery}
                    defaultLayout="justified"
                    showLayoutSwitcher={false}
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Stratégie et ciblage */}
            {(project.cibles || project.strategie_creative) && (
              <ScrollReveal delay={0.1}>
                <LiquidGlass variant="panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
                  <SectionLabel>Stratégie</SectionLabel>
                  {project.cibles && (
                    <div style={{ marginBottom: "2rem" }}>
                      <h3 className="font-display" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", color: "rgba(220,235,255,0.9)", marginBottom: "0.75rem", fontStyle: "italic" }}>
                        Cibles
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: "rgba(200,220,255,0.5)", lineHeight: 1.7 }}>
                        {project.cibles}
                      </p>
                    </div>
                  )}
                  {project.strategie_creative && (
                    <div>
                      <h3 className="font-display" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", color: "rgba(220,235,255,0.9)", marginBottom: "0.75rem", fontStyle: "italic" }}>
                        Stratégie créative
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: "rgba(200,220,255,0.5)", lineHeight: 1.7 }}>
                        {project.strategie_creative}
                      </p>
                    </div>
                  )}
                </LiquidGlass>
              </ScrollReveal>
            )}

            {/* Objectifs */}
            {(project.objectifs_cognitifs?.length || project.objectifs_affectifs?.length || project.objectifs_conatifs?.length) && (
              <ScrollReveal delay={0.1}>
                <div style={{ marginBottom: "4rem" }}>
                  <SectionLabel>Objectifs</SectionLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.objectifs_cognitifs && project.objectifs_cognitifs.length > 0 && (
                      <LiquidGlass variant="panel" style={{ padding: "1.5rem" }}>
                        <ObjectifGroup title="Cognitifs" items={project.objectifs_cognitifs} />
                      </LiquidGlass>
                    )}
                    {project.objectifs_affectifs && project.objectifs_affectifs.length > 0 && (
                      <LiquidGlass variant="panel" style={{ padding: "1.5rem" }}>
                        <ObjectifGroup title="Affectifs" items={project.objectifs_affectifs} />
                      </LiquidGlass>
                    )}
                    {project.objectifs_conatifs && project.objectifs_conatifs.length > 0 && (
                      <LiquidGlass variant="panel" style={{ padding: "1.5rem" }}>
                        <ObjectifGroup title="Conatifs" items={project.objectifs_conatifs} />
                      </LiquidGlass>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Preuves */}
            {project.preuves && project.preuves.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div style={{ marginBottom: "4rem" }}>
                  <SectionLabel>Preuves et éléments complémentaires</SectionLabel>
                  <ProjectEvidenceList evidences={project.preuves} />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div style={{ position: "sticky", top: "7rem" }}>
                <LiquidGlass variant="panel" style={{ padding: "1.75rem 1.5rem" }}>
                  <SectionLabel>Informations</SectionLabel>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <InfoItem label="Date" value={formattedDate} />
                    {project.annonceur && <InfoItem label="Annonceur" value={project.annonceur} />}
                    <InfoItem
                      label="Contexte"
                      value={
                        project.contexte === "Autre" && project.contexte_autre
                          ? `${project.contexte} (${project.contexte_autre})`
                          : project.contexte
                      }
                    />
                    <InfoItem label="Statut" value={project.status} />
                    {project.duration && <InfoItem label="Durée" value={project.duration} />}
                  </div>

                  {project.tools && project.tools.length > 0 && (
                    <div style={{ marginTop: "1.75rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(200,220,255,0.06)" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,220,255,0.22)",
                        marginBottom: "0.75rem",
                      }}>
                        Outils utilisés
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "clamp(0.55rem, 0.7vw, 0.62rem)",
                              letterSpacing: "0.08em",
                              color: "rgba(170, 200, 235, 0.5)",
                              border: "1px solid rgba(180,210,255,0.1)",
                              borderRadius: "999px",
                              padding: "0.25rem 0.6rem",
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </LiquidGlass>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Navigation entre projets */}
        <ScrollReveal delay={0.2}>
          <div style={{ marginTop: "6rem", paddingTop: "3rem", borderTop: "1px solid rgba(200,220,255,0.06)" }}>
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-6">

              <div style={{ flex: 1 }}>
                {previousProject && (
                  <Link href={`/realisations/${previousProject.slug}`} style={{ textDecoration: "none" }}>
                    <LiquidGlass variant="panel" style={{ padding: "1.5rem", height: "100%", cursor: "pointer" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,220,255,0.2)",
                        marginBottom: "0.75rem",
                      }}>
                        Projet précédent
                      </p>
                      <p className="font-display" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "rgba(220,235,255,0.65)", fontStyle: "italic" }}>
                        {previousProject.title}
                      </p>
                    </LiquidGlass>
                  </Link>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
                <Link
                  href="/realisations"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(200,220,255,0.25)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  className="hover:text-[#C5A059]"
                >
                  Tous les projets
                </Link>
              </div>

              <div style={{ flex: 1 }}>
                {nextProject && (
                  <Link href={`/realisations/${nextProject.slug}`} style={{ textDecoration: "none" }}>
                    <LiquidGlass variant="panel" style={{ padding: "1.5rem", height: "100%", textAlign: "right", cursor: "pointer" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,220,255,0.2)",
                        marginBottom: "0.75rem",
                      }}>
                        Projet suivant
                      </p>
                      <p className="font-display" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "rgba(220,235,255,0.65)", fontStyle: "italic" }}>
                        {nextProject.title}
                      </p>
                    </LiquidGlass>
                  </Link>
                )}
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ── Helpers ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-sans, Inter, sans-serif)",
      fontSize: "clamp(0.55rem, 0.75vw, 0.65rem)",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "rgba(197, 160, 89, 0.65)",
      marginBottom: "1.5rem",
    }}>
      {children}
    </p>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(0.55rem, 0.7vw, 0.6rem)",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(200,220,255,0.2)",
        marginBottom: "0.25rem",
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
        color: "rgba(200,220,255,0.65)",
      }}>
        {value}
      </p>
    </div>
  )
}

function ObjectifGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "rgba(220,235,255,0.75)", marginBottom: "1rem", fontStyle: "italic" }}>
        {title}
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
              color: "rgba(200,220,255,0.45)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "rgba(197,160,89,0.5)", marginTop: "0.35rem", fontSize: "0.5rem" }}>●</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
