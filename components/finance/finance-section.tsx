"use client"

import type React from "react"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchStockData, fetchStockQuote } from "@/lib/api/finance-api"
import { StockChart } from "@/components/finance/stock-chart"
import { StockDetails } from "@/components/finance/stock-details"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/ui/section-header"

export function FinanceSection() {
  const [symbol, setSymbol] = useState("AAPL")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("1m")

  const { data: stockData, isLoading: isStockLoading } = useQuery({
    queryKey: ["stock", symbol, timeRange],
    queryFn: () => fetchStockData(symbol, timeRange),
    enabled: !!symbol,
  })

  const { data: quoteData, isLoading: isQuoteLoading } = useQuery({
    queryKey: ["quote", symbol],
    queryFn: () => fetchStockQuote(symbol),
    enabled: !!symbol,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSymbol(searchQuery.toUpperCase())
      setSearchQuery("")
    }
  }

  return (
    <section className="mb-8 space-y-4">
      <SectionHeader title="Financial Dashboard" description="Track stock market data and analyze performance." />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Stock Market Data</CardTitle>
              <CardDescription>Track and analyze stock performance</CardDescription>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Enter stock symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          {isQuoteLoading ? (
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full" />
              ))}
            </div>
          ) : quoteData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 grid gap-4 md:grid-cols-4"
            >
              <Card className="bg-background/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <DollarSign className="mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Current Price</p>
                  <p className="text-2xl font-bold">${quoteData.price.toFixed(2)}</p>
                </CardContent>
              </Card>

              <Card className="bg-background/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {quoteData.change >= 0 ? (
                    <TrendingUp className="mb-2 h-8 w-8 text-emerald-500" />
                  ) : (
                    <TrendingDown className="mb-2 h-8 w-8 text-rose-500" />
                  )}
                  <p className="text-sm font-medium">Change</p>
                  <p className={`text-2xl font-bold ${quoteData.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {quoteData.change >= 0 ? "+" : ""}
                    {quoteData.change.toFixed(2)} ({quoteData.changePercent.toFixed(2)}%)
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BarChart className="mb-2 h-8 w-8 text-blue-500" />
                  <p className="text-sm font-medium">Volume</p>
                  <p className="text-2xl font-bold">{(quoteData.volume / 1000000).toFixed(2)}M</p>
                </CardContent>
              </Card>

              <Card className="bg-background/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2 h-8 w-8 text-amber-500"
                  >
                    <path d="M2 20h20" />
                    <path d="M5 20V8.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C6.52 5 7.08 5 8.2 5h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C19 6.52 19 7.08 19 8.2V20" />
                    <path d="M12 5v6.5" />
                    <path d="M8 8h8" />
                  </svg>
                  <p className="text-sm font-medium">Market Cap</p>
                  <p className="text-2xl font-bold">${(quoteData.marketCap / 1000000000).toFixed(2)}B</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-destructive">
              <p>Failed to load stock quote data. Please try again later.</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{symbol} Stock Price Chart</CardTitle>
                    <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                      <TabsList className="grid w-auto grid-cols-5">
                        <TabsTrigger value="1d">1D</TabsTrigger>
                        <TabsTrigger value="1w">1W</TabsTrigger>
                        <TabsTrigger value="1m">1M</TabsTrigger>
                        <TabsTrigger value="3m">3M</TabsTrigger>
                        <TabsTrigger value="1y">1Y</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  {isStockLoading ? (
                    <Skeleton className="h-[350px] w-full" />
                  ) : stockData ? (
                    <div className="h-[350px]">
                      <StockChart data={stockData} />
                    </div>
                  ) : (
                    <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                      <p>Failed to load stock data. Please try again later.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StockDetails symbol={symbol} quoteData={quoteData} isLoading={isQuoteLoading} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

