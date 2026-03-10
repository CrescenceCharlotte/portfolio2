"use client"

import { useEffect } from "react"
import { GrainOverlay } from "./GrainOverlay"
import { AmbientGlow } from "./AmbientGlow"
import { OgakiCursor } from "./OgakiCursor"
import { Navbar } from "./Navbar"

interface OgakiLayoutProps {
  children: React.ReactNode
  /** Afficher le pied de page avec copyright */
  showFooter?: boolean
}

/**
 * Wrapper layout prestige réutilisable pour toutes les pages
 * Masque le header du layout parent et applique le thème sombre ogaki
 * Le footer du layout parent s'affiche avec les couleurs sombres assorties
 * Inclut : grain overlay, curseur custom, navbar
 */
export function OgakiLayout({ children, showFooter = true }: OgakiLayoutProps) {
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
    <div className="ogaki-wrapper min-h-screen text-white selection:bg-[#C5A059]/30 selection:text-white"
      style={{ background: "#0b1a2e" }}
    >
      <AmbientGlow />
      <GrainOverlay />
      <OgakiCursor />
      <Navbar />

      {/* Contenu de la page — espace pour la navbar fixe */}
      <div className="relative" style={{ paddingTop: "clamp(5rem, 10vh, 8rem)", zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
