import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { LiquidGlass } from "./LiquidGlass"

/* ============================================================
   LiquidGlassButton — Bouton style verre liquide macOS
   ============================================================ */

interface LiquidGlassButtonProps {
  children:  ReactNode
  href?:     string
  onClick?:  () => void
  className?: string
  style?:    CSSProperties
  /** Variante de forme */
  pill?:     boolean
  /** Texte en or au lieu du blanc lunaire */
  gold?:     boolean
  type?:     "button" | "submit" | "reset"
}

export function LiquidGlassButton({
  children,
  href,
  onClick,
  className,
  style,
  pill  = false,
  gold  = false,
  type  = "button",
}: LiquidGlassButtonProps) {
  const textColor = gold
    ? "rgba(197, 160, 89, 0.92)"
    : "rgba(220, 235, 255, 0.88)"

  const inner = (
    <LiquidGlass
      variant={pill ? "pill" : "button"}
      className={className}
      style={{
        fontFamily:    "var(--font-sans, Inter, sans-serif)",
        fontWeight:    400,
        fontSize:      "0.68rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color:         textColor,
        ...style,
      }}
    >
      {children}
    </LiquidGlass>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      {inner}
    </button>
  )
}
