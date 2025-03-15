"use client"

import { motion } from "framer-motion"
import { Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NewsArticle } from "@/components/news/news-section"

interface NewsCardProps {
  article: NewsArticle
  onClick: () => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden">
        <div className="aspect-video w-full cursor-pointer overflow-hidden bg-muted" onClick={onClick}>
          {article.image ? (
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=200&width=400&text=News"
              }}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-accent">
              <span className="text-accent-foreground">No image available</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline">{article.source.name}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
          <h3 className="mb-2 cursor-pointer text-lg font-semibold line-clamp-2" onClick={onClick}>
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.description || "No description available."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button variant="ghost" size="sm" onClick={onClick}>
            Read More
          </Button>
          <Button variant="outline" size="icon" asChild className="h-8 w-8">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open in new tab</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

