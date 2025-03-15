"use client"

import type React from "react"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: React.ReactNode
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-muted-foreground">{description}</p>}
    </motion.div>
  )
}

