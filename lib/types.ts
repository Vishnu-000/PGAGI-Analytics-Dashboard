import type { ReactNode } from "react"

export type MetricProps = {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: ReactNode
}

export type SalesDataPoint = {
  date: string
  revenue: number
  profit: number
  customers: number
}

export type Product = {
  name: string
  sales: number
  percentage: number
}

export type UserActivityDataPoint = {
  time: string
  activeUsers: number
  newSessions: number
}

export type GeoData = {
  region: string
  value: number
  color: string
}

export type DashboardData = {
  metrics: {
    revenue: MetricProps
    users: MetricProps
    orders: MetricProps
    conversionRate: MetricProps
  }
  salesData: SalesDataPoint[]
  topProducts: Product[]
  userActivity: UserActivityDataPoint[]
  geographicData: GeoData[]
}

