"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ParallaxImage({ src, alt, strength = 0.08, className = "" }: { src: string; alt: string; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [strength * 100, -strength * 100])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-full object-cover will-change-transform" />
    </div>
  )
}




