"use client"

import { motion, Variants } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0 },
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.3, ease, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}




