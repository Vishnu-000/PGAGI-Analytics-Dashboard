"use client"

import type React from "react"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MetricProps = {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
}

type OverviewMetricsProps = {
  data: {
    revenue: MetricProps
    users: MetricProps
    orders: MetricProps
    conversionRate: MetricProps
  }
}

export default function OverviewMetrics({ data }: OverviewMetricsProps) {
  const metrics = [data.revenue, data.users, data.orders, data.conversionRate]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold">{metric.value}</div>
            </motion.div>
            <p
              className={cn(
                "flex items-center text-xs",
                metric.change > 0 ? "text-green-500" : metric.change < 0 ? "text-red-500" : "text-muted-foreground",
              )}
            >
              {metric.change > 0 ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : metric.change < 0 ? (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              ) : null}
              {Math.abs(metric.change)}% {metric.changeLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

