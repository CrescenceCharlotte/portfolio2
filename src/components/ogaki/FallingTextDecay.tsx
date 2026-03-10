"use client"

import { useEffect, useRef, useCallback } from "react"
import gsap from "gsap"

interface FallingTextDecayProps {
  text: string
  trigger: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Effet de texte réversible :
 *   - trigger=true  → les lettres tombent en bas de la section avec rotation aléatoire
 *   - trigger=false → les lettres remontent et se recomposent à leur position d'origine
 */
export function FallingTextDecay({
  text,
  trigger,
  className,
  style,
}: FallingTextDecayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean)
    if (!letters.length || !containerRef.current) return

    if (trigger) {
      // Décomposition : les lettres tombent vers le bas de la section
      const containerHeight = containerRef.current.getBoundingClientRect().height
      const sectionHeight =
        containerRef.current.closest("section")?.getBoundingClientRect().height ||
        window.innerHeight
      const containerTop = containerRef.current.getBoundingClientRect().top
      const fallDistance = sectionHeight - containerTop - containerHeight - 40

      gsap.to(letters, {
        y: Math.max(fallDistance, 150),
        opacity: 0.25,
        rotate: () => gsap.utils.random(-90, 90),
        scale: () => gsap.utils.random(0.4, 0.9),
        stagger: {
          amount: 0.5,
          from: "random",
        },
        duration: 1.4,
        ease: "power3.in",
        overwrite: true,
      })
    } else {
      // Recomposition : les lettres remontent à leur place d'origine
      gsap.to(letters, {
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        stagger: {
          amount: 0.4,
          from: "random",
        },
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      })
    }
  }, [trigger])

  const setLetterRef = useCallback(
    (el: HTMLSpanElement | null, index: number) => {
      lettersRef.current[index] = el
    },
    []
  )

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => setLetterRef(el, index)}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}
