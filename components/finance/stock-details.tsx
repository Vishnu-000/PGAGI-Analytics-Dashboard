"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StockQuote {
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  marketCap: number
  peRatio: number
  dividend: number
  yield: number
  previousClose: number
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
}

interface StockDetailsProps {
  symbol: string
  quoteData: StockQuote | undefined
  isLoading: boolean
}

export function StockDetails({ symbol, quoteData, isLoading }: StockDetailsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num)
  }

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{symbol} Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))
        ) : quoteData ? (
          <>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Open</span>
              <span className="font-medium">{formatCurrency(quoteData.open)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Previous Close</span>
              <span className="font-medium">{formatCurrency(quoteData.previousClose)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Day Range</span>
              <span className="font-medium">
                {formatCurrency(quoteData.low)} - {formatCurrency(quoteData.high)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">52 Week Range</span>
              <span className="font-medium">
                {formatCurrency(quoteData.fiftyTwoWeekLow)} - {formatCurrency(quoteData.fiftyTwoWeekHigh)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="font-medium">{formatNumber(quoteData.volume)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-medium">{formatCurrency(quoteData.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">P/E Ratio</span>
              <span className="font-medium">{quoteData.peRatio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Dividend Yield</span>
              <span className="font-medium">{formatPercent(quoteData.yield)}</span>
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
            <p>Failed to load stock details. Please try again later.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

