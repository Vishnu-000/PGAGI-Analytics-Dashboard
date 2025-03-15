"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

interface ChartData {
  date: string
  value: number
}

interface OverviewChartProps {
  data: ChartData[]
  dataKey: string
  color: string
}

export function OverviewChart({ data, dataKey, color }: OverviewChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          tickLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          tickLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#4b5563" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          fillOpacity={1}
          fill={`url(#color${dataKey})`}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

