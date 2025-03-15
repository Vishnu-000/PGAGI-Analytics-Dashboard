"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NewsArticle } from "@/components/news/news-section"

interface NewsModalProps {
  article: NewsArticle
  onClose: () => void
}

export function NewsModal({ article, onClose }: NewsModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative mx-4 max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border bg-card p-6 shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="mb-4 flex items-center justify-between">
            <Badge variant="outline">{article.source.name}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(article.publishedAt)}
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-bold">{article.title}</h2>

          {article.image && (
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="h-auto w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=300&width=600&text=News"
                }}
                crossOrigin="anonymous"
              />
            </div>
          )}

          <div className="mb-6 space-y-4">
            <p className="text-lg font-medium">{article.description}</p>
            <p className="text-muted-foreground">{article.content}</p>
          </div>

          <div className="flex justify-end">
            <Button asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Read Full Article
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

