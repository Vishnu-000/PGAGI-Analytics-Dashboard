"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Loader } from "@/components/ui/loader"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setSidebarOpen(isDesktop)
  }, [isDesktop])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Loader size="lg" />
        <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="bg-green-500/10 border-b border-green-500/20 py-1 px-4 text-center text-sm text-green-600 dark:text-green-400">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          Dashboard deployed successfully and ready for use
        </div>
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 transition-all duration-300 md:p-6 lg:p-8",
            sidebarOpen && isDesktop && "lg:ml-64",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-7xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

