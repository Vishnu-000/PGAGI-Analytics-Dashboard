"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Cloud,
  Newspaper,
  TrendingUp,
  Home,
  Settings,
  Users,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  subItems?: { label: string; href: string }[]
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Force a re-render after initial mount to ensure proper sidebar display
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"))
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: Home,
      label: "Overview",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: Cloud,
      label: "Weather",
      href: "/weather",
      active: pathname === "/weather",
    },
    {
      icon: Newspaper,
      label: "News",
      href: "/news",
      active: pathname === "/news",
      subItems: [
        { label: "Technology", href: "/news/technology" },
        { label: "Business", href: "/news/business" },
        { label: "Sports", href: "/news/sports" },
        { label: "Health", href: "/news/health" },
        { label: "Entertainment", href: "/news/entertainment" },
      ],
    },
    {
      icon: TrendingUp,
      label: "Finance",
      href: "/finance",
      active: pathname === "/finance",
    },
    {
      icon: Users,
      label: "Users",
      href: "/users",
      active: pathname === "/users",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      active: pathname === "/settings",
    },
    {
      icon: HelpCircle,
      label: "Help",
      href: "/help",
      active: pathname === "/help",
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Analytics</span>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.href} {...item} />
              ))}
            </nav>
          </div>

          <div className="absolute bottom-4 left-0 right-0 px-3">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}

function SidebarItem({ icon: Icon, label, href, active, subItems }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (e: React.MouseEvent) => {
    if (subItems) {
      e.preventDefault()
      setExpanded(!expanded)
    }
  }

  return (
    <div>
      <Link
        href={href}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          active && "bg-accent text-accent-foreground",
        )}
        onClick={toggleExpanded}
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="flex-1">{label}</span>
        {subItems && (
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </Link>

      {subItems && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                {subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

