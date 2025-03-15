"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchNewsData } from "@/lib/api/news-api"
import { NewsCard } from "@/components/news/news-card"
import { NewsModal } from "@/components/news/news-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type NewsArticle = {
  id: string
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

export function NewsSection() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeCategory, page],
    queryFn: () => fetchNewsData(activeCategory, page),
    keepPreviousData: true,
  })

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setPage(1)
  }

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <section className="mb-8 space-y-4">
      <SectionHeader
        title="Latest News"
        description="Stay updated with the latest headlines across different categories."
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>News Feed</CardTitle>
              <CardDescription>Browse the latest news from trusted sources</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="mb-4 flex w-full flex-wrap justify-start gap-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-[320px] w-full rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                <p>Failed to load news data. Please try again later.</p>
              </div>
            ) : (
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data?.articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <NewsCard article={article} onClick={() => setSelectedArticle(article)} />
                    </motion.div>
                  ))}
                </div>

                {data && data.totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="outline" onClick={handlePrevPage} disabled={page === 1}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {data.totalPages}
                    </span>
                    <Button variant="outline" onClick={handleNextPage} disabled={page >= data.totalPages}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </section>
  )
}

