"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

/**
 * Barre de navigation minimaliste prestige
 * Backdrop blur progressif au défilement
 * Liens vers les vraies pages du portfolio
 */
export function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.85])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[55] flex items-center justify-between"
      style={{ padding: "clamp(1.25rem, 3vw, 2rem) var(--ogaki-gutter)" }}
    >
      {/* Fond progressif */}
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{ opacity: bgOpacity, backgroundColor: "rgba(8, 15, 30, 0.92)" }}
      />

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 font-display text-white tracking-[0.25em] uppercase"
        style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.125rem)" }}
      >
        Charlotte Crescence
      </Link>

      {/* Liens de navigation - masqués sur mobile */}
      <div className="relative z-10 hidden md:flex items-center gap-10">
        <NavLink href="/realisations">Réalisations</NavLink>
        <NavLink href="/a-propos">À propos</NavLink>
        <NavLink href="/contact" accent>
          Contact
        </NavLink>
      </div>

      {/* Menu mobile - indicateur minimaliste */}
      <div className="relative z-10 md:hidden flex flex-col gap-[5px]">
        <span className="block w-5 h-px bg-white/70" />
        <span className="block w-3 h-px bg-[#C5A059]" />
      </div>
    </motion.nav>
  )
}

function NavLink({
  href,
  children,
  accent = false,
}: {
  href: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 ${
        accent
          ? "text-white/60 hover:text-[#C5A059] border-b border-[#C5A059]/30 pb-1"
          : "text-white/50 hover:text-[white]"
      }`}
    >
      {children}
    </Link>
  )
}
