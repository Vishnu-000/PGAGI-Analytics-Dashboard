"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import OverviewMetrics from "@/components/overview-metrics"
import SalesChart from "@/components/sales-chart"
import UserActivityChart from "@/components/user-activity-chart"
import TopProducts from "@/components/top-products"
import GeographicDistribution from "@/components/geographic-distribution"
import { fetchDashboardData } from "@/lib/api"
import type { DashboardData } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
          </motion.div>

          {loading ? (
            <DashboardSkeleton />
          ) : (
            data && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  className="col-span-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <OverviewMetrics data={data.metrics} />
                </motion.div>

                <motion.div
                  className="col-span-full lg:col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SalesChart data={data.salesData} />
                </motion.div>

                <motion.div
                  className="col-span-full md:col-span-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TopProducts data={data.topProducts} />
                </motion.div>

                <motion.div
                  className="col-span-full md:col-span-1 lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <UserActivityChart data={data.userActivity} />
                </motion.div>

                <motion.div
                  className="col-span-full md:col-span-1 lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <GeographicDistribution data={data.geographicData} />
                </motion.div>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-full grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="col-span-full h-80 rounded-lg lg:col-span-3" />
      <Skeleton className="col-span-full h-80 rounded-lg md:col-span-1" />
      <Skeleton className="col-span-full h-80 rounded-lg md:col-span-1 lg:col-span-2" />
      <Skeleton className="col-span-full h-80 rounded-lg md:col-span-1 lg:col-span-2" />
    </div>
  )
}

