"use client"

import { motion } from "framer-motion"
import type { HTMLAttributes, ReactNode } from "react"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 50,
  ...props
}: AnimatedSectionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 }
      case "down":
        return { y: -distance, x: 0 }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      default:
        return { y: distance, x: 0 }
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        ...getInitialPosition(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
