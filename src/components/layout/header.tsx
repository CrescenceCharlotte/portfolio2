"use client"

import Link from "next/link"
import { useState } from "react"

const navigation = [
  { name: "Accueil",       href: "/" },
  { name: "Réalisations",  href: "/realisations" },
  { name: "À propos",      href: "/a-propos" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background:    "rgba(2, 8, 18, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom:  "1px solid rgba(200, 220, 255, 0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center justify-between px-6 md:px-8">

        {/* ── Logo / Brand ── */}
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="flex flex-col leading-tight group"
        >
          <span
            style={{
              fontFamily:   "var(--font-serif, 'Playfair Display', serif)",
              fontStyle:    "italic",
              fontWeight:   700,
              fontSize:     "1.1rem",
              letterSpacing: "0.02em",
              color:        "rgba(220, 235, 255, 0.92)",
              transition:   "color 0.3s",
            }}
            className="group-hover:text-[#C5A059]"
          >
            Charlotte Crescence
          </span>
        </Link>

        {/* ── Navigation Desktop ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                fontFamily:   "var(--font-sans, Inter, sans-serif)",
                fontWeight:   400,
                fontSize:     "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:        "rgba(170, 200, 230, 0.55)",
                textDecoration: "none",
                transition:   "color 0.25s",
              }}
              className="hover:!text-[rgba(197,160,89,0.9)]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ── Burger Mobile ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ background: "none", border: "none" }}
        >
          <span
            style={{
              display:    "block",
              width:      "22px",
              height:     "1px",
              background: open ? "rgba(197,160,89,0.8)" : "rgba(200,220,255,0.6)",
              transition: "all 0.3s",
              transform:  open ? "translateY(5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display:    "block",
              width:      "22px",
              height:     "1px",
              background: open ? "transparent" : "rgba(200,220,255,0.6)",
              transition: "opacity 0.3s",
            }}
          />
          <span
            style={{
              display:    "block",
              width:      "22px",
              height:     "1px",
              background: open ? "rgba(197,160,89,0.8)" : "rgba(200,220,255,0.6)",
              transition: "all 0.3s",
              transform:  open ? "translateY(-5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* ── Menu Mobile ── */}
      {open && (
        <div
          style={{
            background:    "rgba(2, 8, 20, 0.97)",
            borderTop:     "1px solid rgba(200, 220, 255, 0.06)",
            padding:       "1.5rem 1.5rem 2rem",
          }}
        >
          <nav className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily:    "var(--font-sans, Inter, sans-serif)",
                  fontWeight:    400,
                  fontSize:      "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:         "rgba(170, 200, 230, 0.65)",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
