import type { CSSProperties, ElementType, ReactNode } from "react"

/* ============================================================
   LiquidGlass — Effet verre liquide style macOS
   Adapté pour la palette nuit bleue de Charlotte Crescence.

   Usage :
     <LiquidGlass variant="card">…</LiquidGlass>
     <LiquidGlass variant="button" as="button">…</LiquidGlass>
     <LiquidGlass variant="panel">…</LiquidGlass>
   ============================================================ */

export type LiquidGlassVariant = "card" | "button" | "panel" | "pill"

interface LiquidGlassProps {
  children:  ReactNode
  variant?:  LiquidGlassVariant
  as?:       ElementType
  className?: string
  style?:    CSSProperties
  onClick?:  () => void
}

const VARIANT_STYLES: Record<LiquidGlassVariant, CSSProperties> = {
  card: {
    borderRadius: "1.4rem",
    padding:      "0",           // le contenu gère son propre padding
  },
  button: {
    borderRadius: "3rem",
    padding:      "0.55rem 1.5rem",
    display:      "inline-flex",
    alignItems:   "center",
    justifyContent: "center",
  },
  panel: {
    borderRadius: "1rem",
    padding:      "1.2rem 1.4rem",
  },
  pill: {
    borderRadius: "999px",
    padding:      "0.4rem 1.1rem",
    display:      "inline-flex",
    alignItems:   "center",
    gap:          "0.5rem",
  },
}

export function LiquidGlass({
  children,
  variant  = "card",
  as: Tag  = "div",
  className = "",
  style,
  onClick,
}: LiquidGlassProps) {
  return (
    <Tag
      className={className}
      onClick={onClick}
      style={{
        /* ── Structure ── */
        position:   "relative",
        overflow:   "hidden",
        cursor:     "pointer",

        /* ── Ombre portée douce ── */
        boxShadow:
          "0 8px 32px rgba(0, 0, 5, 0.45), " +
          "0 0 0 1px rgba(180, 215, 255, 0.07)",

        /* ── Transition élastique macOS ── */
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)",

        ...VARIANT_STYLES[variant],
        ...style,
      }}
    >
      {/* ── 1. Couche de distorsion (blur + filtre SVG) ── */}
      <div
        aria-hidden="true"
        style={{
          position:           "absolute",
          zIndex:             0,
          inset:              0,
          backdropFilter:     "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          /* Référence le filtre SVG injecté dans layout.tsx */
          filter:             "url(#glass-distortion)",
          overflow:           "hidden",
          isolation:          "isolate",
          borderRadius:       "inherit",
        }}
      />

      {/* ── 2. Couche de teinte — bleu nuit lunaire ── */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          zIndex:       1,
          inset:        0,
          background:   "rgba(160, 210, 255, 0.07)",
          borderRadius: "inherit",
        }}
      />

      {/* ── 3. Couche de brillance — reflets de surface ── */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          inset:        0,
          zIndex:       2,
          borderRadius: "inherit",
          overflow:     "hidden",
          boxShadow:
            "inset 1.5px 1.5px 1px 0   rgba(255, 255, 255, 0.14), " +
            "inset -1px -1px 1px 0.5px rgba(255, 255, 255, 0.07)",
        }}
      />

      {/* ── 4. Contenu ── */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", height: "100%" }}>
        {children}
      </div>
    </Tag>
  )
}
