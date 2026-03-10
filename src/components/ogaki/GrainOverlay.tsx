"use client"

/**
 * Overlay de grain atmosphérique subtil
 * Utilise un filtre SVG feTurbulence pour créer une texture de bruit filmique
 */
export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      <svg className="w-full h-full opacity-[0.045]">
        <filter id="ogaki-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ogaki-grain)" />
      </svg>
    </div>
  )
}
