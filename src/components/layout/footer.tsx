import Link from "next/link"

const links = [
  { name: "Accueil",      href: "/" },
  { name: "Réalisations", href: "/realisations" },
  { name: "À propos",     href: "/a-propos" },
  { name: "Contact",      href: "/contact" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position:     "relative",
        borderTop:    "1px solid rgba(200, 220, 255, 0.06)",
        background:   "rgba(2, 6, 16, 0.6)",
        paddingTop:   "3.5rem",
        paddingBottom: "2rem",
        overflow:     "hidden",
      }}
    >
      {/* Lueur dorée subtile en haut à gauche */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top:        "-60px",
          left:       "10%",
          width:      "300px",
          height:     "300px",
          background: "radial-gradient(circle, rgba(197,160,89,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8">

        {/* ── Ligne centrale : Brand ── */}
        <div className="flex flex-col items-center text-center mb-10">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
                fontStyle:     "italic",
                fontWeight:    700,
                fontSize:      "clamp(1.4rem, 4vw, 2rem)",
                letterSpacing: "0.04em",
                color:         "rgba(220, 235, 255, 0.85)",
                display:       "block",
                marginBottom:  "0.35rem",
              }}
            >
              Charlotte Crescence
            </span>
          </Link>
          <span
            style={{
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontWeight:    400,
              fontSize:      "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(140, 170, 210, 0.4)",
            }}
          >
            Art Direction · Digital · Portfolio
          </span>
        </div>

        {/* ── Séparateur or ── */}
        <div
          style={{
            width:      "60px",
            height:     "1px",
            background: "rgba(197, 160, 89, 0.35)",
            margin:     "0 auto 2.5rem",
          }}
        />

        {/* ── Navigation ── */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                fontFamily:    "var(--font-sans, Inter, sans-serif)",
                fontWeight:    400,
                fontSize:      "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "rgba(150, 180, 220, 0.45)",
                textDecoration: "none",
                transition:    "color 0.25s",
              }}
              className="hover:!text-[rgba(197,160,89,0.8)]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ── Bas de page ── */}
        <div
          style={{
            borderTop:  "1px solid rgba(200, 220, 255, 0.05)",
            paddingTop: "1.5rem",
            display:    "flex",
            flexWrap:   "wrap",
            justifyContent: "center",
            gap:        "1rem",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontSize:      "0.6rem",
              letterSpacing: "0.14em",
              color:         "rgba(130, 160, 200, 0.3)",
            }}
          >
            © {year} Charlotte Crescence — Tous droits réservés
          </p>
          <span style={{ color: "rgba(130, 160, 200, 0.15)", fontSize: "0.6rem" }}>·</span>
          <p
            style={{
              fontFamily:    "var(--font-sans, Inter, sans-serif)",
              fontSize:      "0.6rem",
              letterSpacing: "0.14em",
              color:         "rgba(130, 160, 200, 0.3)",
            }}
          >
            Réalisé avec Next.js
          </p>
        </div>

      </div>
    </footer>
  )
}
