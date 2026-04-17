"use client"

import { useState } from "react"

export function IPhoneCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>

      {/* Wrapper boutons latéraux + téléphone */}
      <div style={{ position: "relative", display: "inline-block" }}>

        {/* Boutons latéraux gauche — en dehors du phone div */}
        <div style={{ position: "absolute", left: "-4px", top: "100px", width: "4px", height: "32px", background: "rgba(20,22,32,0.95)", borderRadius: "2px 0 0 2px", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "-4px", top: "145px", width: "4px", height: "56px", background: "rgba(20,22,32,0.95)", borderRadius: "2px 0 0 2px", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "-4px", top: "212px", width: "4px", height: "56px", background: "rgba(20,22,32,0.95)", borderRadius: "2px 0 0 2px", zIndex: 0 }} />
        {/* Bouton droit */}
        <div style={{ position: "absolute", right: "-4px", top: "160px", width: "4px", height: "80px", background: "rgba(20,22,32,0.95)", borderRadius: "0 2px 2px 0", zIndex: 0 }} />

        {/* iPhone — overflow hidden ici pour clipper correctement */}
        <div style={{
          position:     "relative",
          width:        "280px",
          height:       "580px",
          borderRadius: "44px",
          border:       "8px solid rgba(20, 22, 32, 0.95)",
          background:   "#000",
          overflow:     "hidden",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.08)",
            "0 40px 100px rgba(0,0,0,0.85)",
            "inset 0 0 0 1px rgba(255,255,255,0.04)",
            "0 0 60px rgba(197,160,89,0.06)",
          ].join(", "),
          zIndex: 1,
        }}>

          {/* Dynamic Island */}
          <div style={{
            position:     "absolute",
            top:          "14px",
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        "110px",
            height:       "30px",
            background:   "#000",
            borderRadius: "20px",
            zIndex:       10,
          }} />

          {/* Barre de statut */}
          <div style={{
            position:       "absolute",
            top:            0,
            left:           0,
            right:          0,
            height:         "54px",
            zIndex:         9,
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            padding:        "0 20px 6px",
            pointerEvents:  "none",
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff", fontFamily: "sans-serif" }}>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <rect x="0" y="6" width="3" height="6" rx="1" />
                <rect x="4.5" y="4" width="3" height="8" rx="1" />
                <rect x="9" y="2" width="3" height="10" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                <path d="M3.5 6.5a6.5 6.5 0 019 0" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" />
                <path d="M1 4a10 10 0 0114 0" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="white" strokeOpacity="0.5" />
                <rect x="2" y="2" width="16" height="8" rx="1.5" fill="white" />
                <path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Image — remplit tout l'écran, clippée par overflow:hidden du parent */}
          <div
            style={{ position: "absolute", inset: 0, cursor: "pointer" }}
            onClick={next}
          >
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              style={{
                width:     "100%",
                height:    "100%",
                objectFit: "cover",
                display:   "block",
              }}
            />
            {/* Dégradé status bar */}
            <div style={{
              position:   "absolute",
              top:        0,
              left:       0,
              right:      0,
              height:     "80px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Points navigation */}
          <div style={{
            position:       "absolute",
            bottom:         "80px",
            left:           0,
            right:          0,
            display:        "flex",
            justifyContent: "center",
            gap:            "5px",
            zIndex:         10,
            pointerEvents:  "none",
          }}>
            {images.map((_, i) => (
              <div
                key={i}
                style={{
                  width:        i === current ? "16px" : "6px",
                  height:       "6px",
                  borderRadius: "3px",
                  background:   i === current ? "#fff" : "rgba(255,255,255,0.4)",
                  transition:   "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Barre maison */}
          <div style={{
            position:     "absolute",
            bottom:       "10px",
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        "100px",
            height:       "4px",
            background:   "rgba(255,255,255,0.35)",
            borderRadius: "2px",
            zIndex:       10,
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Flèches externes */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <button
          onClick={prev}
          style={{
            background:     "rgba(10,15,30,0.6)",
            border:         "1px solid rgba(197,160,89,0.25)",
            borderRadius:   "50%",
            width:          "36px",
            height:         "36px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            color:          "rgba(197,160,89,0.8)",
            fontSize:       "1.2rem",
            lineHeight:     1,
          }}
        >
          ‹
        </button>
        <span style={{
          fontFamily:    "var(--font-sans, Inter, sans-serif)",
          fontSize:      "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "rgba(200,220,255,0.25)",
        }}>
          {current + 1} / {images.length}
        </span>
        <button
          onClick={next}
          style={{
            background:     "rgba(10,15,30,0.6)",
            border:         "1px solid rgba(197,160,89,0.25)",
            borderRadius:   "50%",
            width:          "36px",
            height:         "36px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            color:          "rgba(197,160,89,0.8)",
            fontSize:       "1.2rem",
            lineHeight:     1,
          }}
        >
          ›
        </button>
      </div>

    </div>
  )
}
