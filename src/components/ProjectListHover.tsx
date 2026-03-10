"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

type Project = {
  slug: string
  title: string
  date: string
  project_type: string
  featured_image: string
}

type ProjectListHoverProps = {
  projects: Project[]
  hrefBase?: string
}

export function ProjectListHover({ projects, hrefBase = "/realisations" }: ProjectListHoverProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Tracking de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (!isMobile && hoveredProject) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hoveredProject, isMobile])

  const hoveredProjectData = projects.find(p => p.slug === hoveredProject)

  return (
    <div className="relative">
      {/* Liste des projets */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {projects.map((project, index) => {
          const year = new Date(project.date).getFullYear()
          
          return (
            <Link
              key={project.slug}
              href={`${hrefBase}/${encodeURIComponent(project.slug)}`}
              className="group block"
              onMouseEnter={() => !isMobile && setHoveredProject(project.slug)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div
                className="py-6 md:py-8 flex items-center justify-between gap-8 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                {/* Titre du projet */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Numéro */}
                  <span className="text-sm text-neutral-400 font-mono hidden md:block w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                    {project.title}
                  </h3>
                </div>

                {/* Informations à droite */}
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6 text-right shrink-0">
                  <span className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light">
                    {project.project_type}
                  </span>
                  <span className="text-sm md:text-base text-neutral-400 dark:text-neutral-500 font-mono">
                    {year}
                  </span>
                </div>
              </motion.div>

              {/* Image sur mobile (optionnelle, affichée sous le titre) */}
              {isMobile && hoveredProject === project.slug && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden rounded-lg"
                >
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Image flottante qui suit la souris (desktop uniquement) */}
      {!isMobile && (
        <AnimatePresence>
          {hoveredProjectData && (
            <motion.div
              className="fixed pointer-events-none z-50 rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePosition.x + 20, // Offset de 20px à droite du curseur
                y: mousePosition.y + 20, // Offset de 20px en bas du curseur
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                x: { type: "spring", damping: 30, stiffness: 200 }, // Mouvement lissé
                y: { type: "spring", damping: 30, stiffness: 200 },
              }}
              style={{
                width: "400px",
                height: "250px",
              }}
            >
              <img
                src={hoveredProjectData.featured_image}
                alt={hoveredProjectData.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay avec titre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-light">
                  {hoveredProjectData.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
