"use client"

import { ScrollReveal } from "./ScrollReveal"
import { ProjectCard } from "./ProjectCard"
import Link from "next/link"

interface ProjectData {
  slug: string
  title: string
  featured_image: string
  project_type: string
  date: string
  annonceur?: string
  tools?: string[]
}

interface ProjectsProps {
  projects: ProjectData[]
}

/**
 * Grille de projets minimaliste — 3 colonnes sur desktop, 1 sur mobile
 * Utilise les vrais projets du CMS transmis en props
 * Chaque carte se révèle au scroll avec un décalage temporel
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      style={{ padding: "clamp(4rem, 15vh, 12rem) var(--ogaki-gutter)" }}
    >
      <ScrollReveal>
        <p
          className="text-[#C5A059] font-sans uppercase mb-4"
          style={{
            fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
            letterSpacing: "0.35em",
          }}
        >
          Mes projets en vedette
        </p>
        <h2
          className="font-display text-white mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Mes Réalisations Récentes
        </h2>
      </ScrollReveal>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.15}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                image={project.featured_image}
                projectType={project.project_type}
                date={project.date}
                annonceur={project.annonceur}
                tools={project.tools}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <p
            className="text-[white]/30 font-sans text-center"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
          >
            Mes créations seront bientôt ajoutées.
          </p>
        </ScrollReveal>
      )}

      {/* Lien vers toutes les réalisations */}
      {projects.length > 0 && (
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <Link
              href="/realisations"
              className="text-[white]/38 hover:text-[#C5A059] font-sans uppercase transition-colors duration-400 border-b border-[white]/10 hover:border-[#C5A059]/40 pb-1"
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.7rem)",
                letterSpacing: "0.2em",
              }}
            >
              Voir tous mes projets
            </Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  )
}
