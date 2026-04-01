import Link from "next/link"
import { LiquidGlass } from "./LiquidGlass"

export function CardWork({
  slug,
  title,
  image,
  projectTypes,
  date,
  annonceur,
  hrefBase = "/projects",
}: {
  slug:          string
  title:         string
  image?:        string
  projectTypes?: string | string[]
  date?:         string
  annonceur?:    string
  hrefBase?:     string
}) {
  return (
    <Link
      href={`${hrefBase}/${encodeURIComponent(slug)}`}
      className="group block"
      style={{ textDecoration: "none" }}
    >
      {/* Conteneur principal — hauteur fixe, overflow caché, coins arrondis */}
      <div
        className="hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(0,0,10,0.6),0_0_0_1px_rgba(197,160,89,0.15)]"
        style={{
          position:     "relative",
          height:       "340px",
          borderRadius: "1.4rem",
          overflow:     "hidden",
          boxShadow:
            "0 8px 32px rgba(0, 0, 5, 0.45), " +
            "0 0 0 1px rgba(180, 215, 255, 0.07)",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2), box-shadow 0.4s ease",
        }}
      >
        {/* ── Image de fond ── */}
        {image ? (
          <img
            src={image}
            alt={title}
            className="group-hover:scale-105"
            style={{
              position:   "absolute",
              inset:      0,
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              objectPosition: "center",
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        ) : (
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(135deg, #0a1628 0%, #030c1f 100%)",
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
                fontStyle:     "italic",
                fontSize:      "1.2rem",
                color:         "rgba(200,220,255,0.15)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </span>
          </div>
        )}

        {/* ── Dégradé sombre vers le bas ── */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to top, rgba(1,5,18,0.85) 0%, rgba(1,5,18,0.3) 50%, transparent 100%)",
            zIndex:     2,
          }}
        />

        {/* ── Reflet verre (bordure intérieure) ── */}
        <div
          aria-hidden="true"
          style={{
            position:  "absolute",
            inset:     0,
            zIndex:    3,
            boxShadow:
              "inset 1.5px 1.5px 1px 0   rgba(255,255,255,0.08), " +
              "inset -1px -1px 1px 0.5px rgba(255,255,255,0.04)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* ── Panel titre en bas ── */}
        <div
          style={{
            position: "absolute",
            bottom:   "1rem",
            left:     "1rem",
            right:    "1rem",
            zIndex:   4,
          }}
        >
          <LiquidGlass variant="panel" style={{ padding: "0.9rem 1.1rem" }}>
            <h3
              style={{
                fontFamily:    "var(--font-serif, 'Playfair Display', serif)",
                fontStyle:     "italic",
                fontWeight:    600,
                fontSize:      "1.05rem",
                color:         "rgba(220, 235, 255, 0.92)",
                margin:        0,
                letterSpacing: "0.02em",
                lineHeight:    1.2,
              }}
            >
              {title}
            </h3>

            {/* Types de projet */}
            {projectTypes && (
              <p style={{
                fontFamily:    "var(--font-sans, Inter, sans-serif)",
                fontWeight:    400,
                fontSize:      "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "rgba(140, 180, 220, 0.65)",
                marginTop:     "0.5rem",
                marginBottom:  0,
                lineHeight:    1.4,
              }}>
                {Array.isArray(projectTypes) ? projectTypes.join(" · ") : projectTypes}
              </p>
            )}

            {/* Année + annonceur */}
            {(date || annonceur) && (
              <p style={{
                fontFamily:  "var(--font-sans, Inter, sans-serif)",
                fontWeight:  400,
                fontSize:    "0.72rem",
                color:       "rgba(197, 160, 89, 0.7)",
                marginTop:   "0.35rem",
                marginBottom: 0,
                lineHeight:  1.4,
              }}>
                {date && new Date(date).getFullYear()}
                {date && annonceur && " · "}
                {annonceur}
              </p>
            )}
          </LiquidGlass>
        </div>
      </div>
    </Link>
  )
}
