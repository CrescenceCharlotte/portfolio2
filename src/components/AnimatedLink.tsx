"use client"

import Link, { LinkProps } from "next/link"
import { useState } from "react"

type Props = LinkProps & {
  children: React.ReactNode
  className?: string
  label?: string
}

export function AnimatedLink({ children, className = "", label, ...props }: Props) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      {...props}
      className={`relative inline-block transition-colors ${className}`}
      data-cursor-label={label || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-[2px] w-full"
        style={{
          backgroundColor: hovered ? '#E11957' : 'transparent',
          transition: 'background-color 200ms cubic-bezier(0.22,1,0.36,1)'
        }}
      />
    </Link>
  )
}




