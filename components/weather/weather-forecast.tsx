"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ForecastItem {
  date: string
  time?: string
  temperature: number
  weatherCode: number
  description: string
  precipitation: number
  windSpeed: number
}

interface WeatherForecastProps {
  data: ForecastItem[]
  type: "daily" | "hourly"
}

export function WeatherForecast({ data, type }: WeatherForecastProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to the beginning when data changes
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft = 0
    }
  }, [data])

  const getWeatherIcon = (code: number) => {
    // Simple mapping of weather codes to icons
    if (code < 300) return "⛈️" // thunderstorm
    if (code < 500) return "🌧️" // drizzle
    if (code < 600) return "🌧️" // rain
    if (code < 700) return "❄️" // snow
    if (code < 800) return "🌫️" // atmosphere
    if (code === 800) return "☀️" // clear
    return "☁️" // clouds
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return type === "daily"
      ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      : date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="w-full whitespace-nowrap pb-4">
      <div className="flex w-max space-x-4 p-1">
        {data.map((item, index) => (
          <motion.div
            key={type === "daily" ? item.date : `${item.date}-${item.time}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className={cn(
                "w-[120px] overflow-hidden transition-colors hover:bg-accent",
                index === 0 && "border-primary",
              )}
            >
              <CardContent className="p-3 text-center">
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  {formatDate(type === "daily" ? item.date : `${item.date}T${item.time}`)}
                </div>
                <div className="text-3xl">{getWeatherIcon(item.weatherCode)}</div>
                <div className="mt-2 text-lg font-bold">{item.temperature}°C</div>
                <div className="mt-1 text-xs">{item.description}</div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>💧 {item.precipitation}%</span>
                  <span>💨 {item.windSpeed}km/h</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

