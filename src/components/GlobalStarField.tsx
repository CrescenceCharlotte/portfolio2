"use client"

import { useEffect, useRef } from "react"

const STAR_COUNT = 200

/**
 * GlobalStarField — Fond étoilé fixe, affiché derrière tout le site.
 * Les étoiles sont générées en JS avec des animations CSS variées.
 * z-index: 0 → derrière tous les contenus.
 */
export function GlobalStarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const frag = document.createDocumentFragment()

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div")

      const size     = (0.6 + Math.random() * 2).toFixed(2)
      const x        = (Math.random() * 100).toFixed(2)
      const y        = (Math.random() * 100).toFixed(2)
      const delay    = (Math.random() * 8).toFixed(2)
      const duration = (3 + Math.random() * 5).toFixed(2)

      // 3 teintes : blanc pur, blanc-bleu, légèrement chaud
      const hue = Math.random()
      const color = hue < 0.6
        ? `rgba(210, 230, 255, 0.9)`   // blanc-bleu (majorité)
        : hue < 0.85
          ? `rgba(255, 255, 255, 0.95)` // blanc pur
          : `rgba(255, 245, 210, 0.85)` // légèrement doré

      const animName = i % 3 === 0 ? "gsfTwinkleB" : i % 3 === 1 ? "gsfTwinkleC" : "gsfTwinkle"

      star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${parseFloat(size) * 2}px ${parseFloat(size) * 0.5}px rgba(150, 200, 255, 0.3);
        animation: ${animName} ${duration}s ease-in-out ${delay}s infinite both;
        will-change: opacity, transform;
      `
      frag.appendChild(star)
    }

    container.appendChild(frag)

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  return (
    <>
      {/* Keyframes injectées une seule fois */}
      <style>{`
        @keyframes gsfTwinkle {
          0%,100% { opacity: 0.08; transform: scale(0.7);  }
          40%      { opacity: 1;    transform: scale(1.25); }
          70%      { opacity: 0.25; transform: scale(0.85); }
        }
        @keyframes gsfTwinkleB {
          0%,100% { opacity: 0.12; transform: scale(0.75); }
          50%      { opacity: 0.95; transform: scale(1.3);  }
          80%      { opacity: 0.2;  transform: scale(0.9);  }
        }
        @keyframes gsfTwinkleC {
          0%,100% { opacity: 0.05; transform: scale(0.6);  }
          25%      { opacity: 0.75; transform: scale(1.1);  }
          60%      { opacity: 0.15; transform: scale(0.8);  }
          80%      { opacity: 0.9;  transform: scale(1.2);  }
        }
      `}</style>

      {/* Fond dégradé bleu nuit + nébuleuse douce */}
      <div
        aria-hidden="true"
        style={{
          position:   "fixed",
          inset:      0,
          zIndex:     0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 40% at 20% 70%, rgba(25, 0, 70, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 80% 20%, rgba(0, 15, 80, 0.2)  0%, transparent 70%),
            linear-gradient(175deg, #030c1f 0%, #020810 40%, #020612 70%, #030a1c 100%)
          `,
        }}
      />

      {/* Étoiles scintillantes */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position:   "fixed",
          inset:      0,
          zIndex:     0,
          pointerEvents: "none",
          overflow:   "hidden",
        }}
      />
    </>
  )
}
