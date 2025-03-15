"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowUpRight, Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchOverviewData } from "@/lib/api/overview-api"
import { OverviewChart } from "@/components/overview/overview-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/ui/section-header"

export function OverviewSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverviewData,
  })

  if (error) {
    return (
      <div className="mb-8 rounded-lg bg-destructive/10 p-4 text-destructive">
        <p>Failed to load overview data. Please try again later.</p>
      </div>
    )
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: data?.revenue || "$0",
      change: data?.revenueChange || 0,
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: data?.users || "0",
      change: data?.usersChange || 0,
      icon: Users,
    },
    {
      title: "New Orders",
      value: data?.orders || "0",
      change: data?.ordersChange || 0,
      icon: ShoppingCart,
    },
    {
      title: "Conversion Rate",
      value: data?.conversionRate || "0%",
      change: data?.conversionRateChange || 0,
      icon: TrendingUp,
    },
  ]

  return (
    <section className="mb-8 space-y-4">
      <SectionHeader
        title={
          <div className="flex items-center">
            <span>Welcome, Vishnu</span>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-2"
            >
              👋
            </motion.div>
          </div>
        }
        description="Your key metrics and performance indicators at a glance."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {isLoading ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-7 w-20" />
                  <Skeleton className="h-4 w-16" />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className={metric.change > 0 ? "text-emerald-500" : metric.change < 0 ? "text-rose-500" : ""}>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                    <ArrowUpRight
                      className={`ml-1 h-3 w-3 ${
                        metric.change > 0
                          ? "text-emerald-500"
                          : metric.change < 0
                            ? "rotate-180 text-rose-500"
                            : "text-muted-foreground"
                      }`}
                    />
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Track your key performance indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[350px] w-full" />
            ) : (
              <Tabs defaultValue="revenue">
                <TabsList className="mb-4">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="revenue" className="h-[350px]">
                  <OverviewChart data={data?.revenueData || []} dataKey="value" color="#10b981" />
                </TabsContent>
                <TabsContent value="users" className="h-[350px]">
                  <OverviewChart data={data?.usersData || []} dataKey="value" color="#6366f1" />
                </TabsContent>
                <TabsContent value="orders" className="h-[350px]">
                  <OverviewChart data={data?.ordersData || []} dataKey="value" color="#f59e0b" />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

