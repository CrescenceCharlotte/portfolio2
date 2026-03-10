"use client"

const orbs: {
  style: React.CSSProperties
  animation: string
}[] = [
  {
    style: {
      width: "clamp(400px, 50vw, 800px)",
      height: "clamp(400px, 50vw, 800px)",
      left: "-5%",
      top: "-10%",
      background:
        "radial-gradient(circle, rgba(197,160,89,0.15) 0%, rgba(197,160,89,0.05) 40%, transparent 70%)",
    },
    animation: "ogaki-drift-1 20s ease-in-out infinite",
  },
  {
    style: {
      width: "clamp(350px, 45vw, 700px)",
      height: "clamp(350px, 45vw, 700px)",
      right: "-10%",
      bottom: "10%",
      background:
        "radial-gradient(circle, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.04) 40%, transparent 70%)",
    },
    animation: "ogaki-drift-2 25s ease-in-out infinite",
  },
  {
    style: {
      width: "clamp(300px, 40vw, 650px)",
      height: "clamp(300px, 40vw, 650px)",
      left: "35%",
      top: "25%",
      background:
        "radial-gradient(circle, rgba(30,58,95,0.45) 0%, rgba(30,58,95,0.15) 40%, transparent 70%)",
    },
    animation: "ogaki-drift-3 22s ease-in-out infinite",
  },
  {
    style: {
      width: "clamp(250px, 35vw, 550px)",
      height: "clamp(250px, 35vw, 550px)",
      right: "15%",
      top: "-5%",
      background:
        "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.03) 40%, transparent 70%)",
    },
    animation: "ogaki-drift-4 28s ease-in-out infinite",
  },
  {
    style: {
      width: "clamp(320px, 38vw, 600px)",
      height: "clamp(320px, 38vw, 600px)",
      left: "10%",
      bottom: "-5%",
      background:
        "radial-gradient(circle, rgba(197,160,89,0.1) 0%, rgba(197,160,89,0.03) 40%, transparent 70%)",
    },
    animation: "ogaki-drift-5 24s ease-in-out infinite",
  },
]

export function AmbientGlow() {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            willChange: "transform, opacity",
            animation: orb.animation,
            ...orb.style,
          }}
        />
      ))}
    </div>
  )
}
