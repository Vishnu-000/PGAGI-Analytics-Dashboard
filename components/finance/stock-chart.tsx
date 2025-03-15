"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface StockDataPoint {
  date: string
  price: number
  volume: number
}

interface StockChartProps {
  data: StockDataPoint[]
}

export function StockChart({ data }: StockChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [tooltipActive, setTooltipActive] = useState(false)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: data.length > 30 ? "numeric" : undefined,
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  const priceColor =
    data[0]?.price <= data[data.length - 1]?.price
      ? "#10b981" // green for uptrend
      : "#ef4444" // red for downtrend

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        onMouseEnter={() => setTooltipActive(true)}
        onMouseLeave={() => setTooltipActive(false)}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={priceColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={priceColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          tickLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          minTickGap={30}
        />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          tickFormatter={formatPrice}
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          tickLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          width={60}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} vertical={false} />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
          labelFormatter={formatDate}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#4b5563" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={priceColor}
          fillOpacity={1}
          fill={`url(#colorPrice)`}
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0, fill: priceColor }}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

