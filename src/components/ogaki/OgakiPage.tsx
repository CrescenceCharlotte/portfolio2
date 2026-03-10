"use client"

import { useEffect } from "react"
import { GrainOverlay } from "./GrainOverlay"
import { AmbientGlow } from "./AmbientGlow"
import { OgakiCursor } from "./OgakiCursor"
import { Navbar } from "./Navbar"
import { Hero } from "./Hero"
import { Expertise } from "./Expertise"
import { Projects } from "./Projects"

interface ProjectData {
  slug: string
  title: string
  featured_image: string
  project_type: string
  date: string
  annonceur?: string
  tools?: string[]
}

interface OgakiPageProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  heroImage?: string
  featuredProjects: ProjectData[]
}

/**
 * Wrapper client principal de la page prestige
 * Masque le header du layout parent et applique le thème sombre
 * Le footer global du layout reste visible
 */
export function OgakiPage({
  title,
  subtitle,
  description,
  ctaText,
  heroImage,
  featuredProjects,
}: OgakiPageProps) {
  useEffect(() => {
    const header = document.querySelector("header")
    const ambient = document.querySelector(".ambient-green")

    document.body.style.background = "#0b1a2e"

    if (header) (header as HTMLElement).style.display = "none"
    if (ambient) (ambient as HTMLElement).style.display = "none"

    return () => {
      document.body.style.background = ""
      if (header) (header as HTMLElement).style.display = ""
      if (ambient) (ambient as HTMLElement).style.display = ""
    }
  }, [])

  return (
    <div className="ogaki-wrapper bg-[#0b1a2e] min-h-screen text-white selection:bg-[#C5A059]/30 selection:text-white">
      <AmbientGlow />
      <GrainOverlay />
      <OgakiCursor />
      <Navbar />
      <Hero
        title={title}
        subtitle={subtitle}
        description={description}
        ctaText={ctaText}
        heroImage={heroImage}
      />
      <Expertise />
      <Projects projects={featuredProjects} />
    </div>
  )
}
