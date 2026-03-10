"use client"

import Link from "next/link"
import { useState } from "react"

type Project = {
  slug: string
  title: string
  annonceur?: string
  project_type: string
  featured_image: string
}

type ProjectArchiveListProps = {
  projects: Project[]
  hrefBase?: string
}

export function ProjectArchiveList({ projects, hrefBase = "/realisations" }: ProjectArchiveListProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const hoveredProjectData = projects.find(p => p.slug === hoveredProject)

  return (
    <div className="relative">
      {/* Liste des projets */}
      <div className="border-t border-neutral-200">
        {projects.map((project) => {
          const isHovered = hoveredProject === project.slug
          
          return (
            <Link
              key={project.slug}
              href={`${hrefBase}/${encodeURIComponent(project.slug)}`}
              className="group block border-b border-neutral-200 transition-colors duration-200 hover:bg-neutral-50"
              onMouseEnter={() => setHoveredProject(project.slug)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="py-5 md:py-6 px-4 md:px-8 flex items-center justify-between gap-8">
                {/* Partie gauche : Image miniature + Titre */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Miniature de l'image */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden bg-neutral-100">
                    <img
                      src={project.featured_image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isHovered ? 'scale-110 brightness-110' : 'scale-100 grayscale-[30%]'
                      }`}
                    />
                    {/* Overlay au focus */}
                    {isHovered && (
                      <div className="absolute inset-0 ring-2 ring-black ring-inset" />
                    )}
                  </div>

                  {/* Nom du projet - Gras */}
                  <h3 className="text-lg md:text-xl font-bold text-black transition-colors duration-200 group-hover:text-neutral-500 truncate">
                    {project.title}
                  </h3>
                </div>

                {/* Catégorie / Client - Plus petit et moins contrasté */}
                <div className="flex items-center gap-4 md:gap-8 text-sm md:text-base text-neutral-500 flex-shrink-0">
                  {project.annonceur && (
                    <span className="hidden md:inline">{project.annonceur}</span>
                  )}
                  <span className="whitespace-nowrap">{project.project_type}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Image agrandie au survol (desktop) */}
      <div className="hidden lg:block fixed top-1/2 right-12 -translate-y-1/2 pointer-events-none z-50">
        {hoveredProjectData && (
          <div 
            className="w-[450px] h-[550px] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
          >
            <img
              src={hoveredProjectData.featured_image}
              alt={hoveredProjectData.title}
              className="w-full h-full object-cover"
            />
            {/* Bordure noire pour l'effet focus */}
            <div className="absolute inset-0 ring-4 ring-black" />
          </div>
        )}
      </div>
    </div>
  )
}
