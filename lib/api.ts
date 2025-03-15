import type { DashboardData } from "./types"
import { BarChart3, DollarSign, ShoppingCart, Users } from "lucide-react"

// Simulated API call to fetch dashboard data
export async function fetchDashboardData(): Promise<DashboardData> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metrics: {
          revenue: {
            title: "Total Revenue",
            value: "$45,231.89",
            change: 20.1,
            changeLabel: "from last month",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
          },
          users: {
            title: "Active Users",
            value: "2,350",
            change: 5.4,
            changeLabel: "from last month",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
          },
          orders: {
            title: "Orders",
            value: "1,247",
            change: -3.2,
            changeLabel: "from last month",
            icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
          },
          conversionRate: {
            title: "Conversion Rate",
            value: "3.2%",
            change: 1.2,
            changeLabel: "from last month",
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
          },
        },
        salesData: [
          {
            date: "Jan",
            revenue: 4000,
            profit: 2400,
            customers: 240,
          },
          {
            date: "Feb",
            revenue: 3000,
            profit: 1398,
            customers: 210,
          },
          {
            date: "Mar",
            revenue: 2000,
            profit: 9800,
            customers: 290,
          },
          {
            date: "Apr",
            revenue: 2780,
            profit: 3908,
            customers: 320,
          },
          {
            date: "May",
            revenue: 1890,
            profit: 4800,
            customers: 281,
          },
          {
            date: "Jun",
            revenue: 2390,
            profit: 3800,
            customers: 250,
          },
          {
            date: "Jul",
            revenue: 3490,
            profit: 4300,
            customers: 290,
          },
          {
            date: "Aug",
            revenue: 4000,
            profit: 2400,
            customers: 230,
          },
          {
            date: "Sep",
            revenue: 3000,
            profit: 1398,
            customers: 210,
          },
          {
            date: "Oct",
            revenue: 2000,
            profit: 9800,
            customers: 290,
          },
          {
            date: "Nov",
            revenue: 2780,
            profit: 3908,
            customers: 320,
          },
          {
            date: "Dec",
            revenue: 3890,
            profit: 4800,
            customers: 340,
          },
        ],
        topProducts: [
          {
            name: "Product A",
            sales: 1234,
            percentage: 85,
          },
          {
            name: "Product B",
            sales: 876,
            percentage: 65,
          },
          {
            name: "Product C",
            sales: 543,
            percentage: 45,
          },
          {
            name: "Product D",
            sales: 432,
            percentage: 35,
          },
          {
            name: "Product E",
            sales: 321,
            percentage: 25,
          },
        ],
        userActivity: [
          {
            time: "00:00",
            activeUsers: 200,
            newSessions: 40,
          },
          {
            time: "03:00",
            activeUsers: 120,
            newSessions: 30,
          },
          {
            time: "06:00",
            activeUsers: 180,
            newSessions: 50,
          },
          {
            time: "09:00",
            activeUsers: 620,
            newSessions: 120,
          },
          {
            time: "12:00",
            activeUsers: 780,
            newSessions: 150,
          },
          {
            time: "15:00",
            activeUsers: 890,
            newSessions: 180,
          },
          {
            time: "18:00",
            activeUsers: 750,
            newSessions: 140,
          },
          {
            time: "21:00",
            activeUsers: 450,
            newSessions: 90,
          },
        ],
        geographicData: [
          {
            region: "North America",
            value: 40,
            color: "#8884d8",
          },
          {
            region: "Europe",
            value: 30,
            color: "#82ca9d",
          },
          {
            region: "Asia",
            value: 20,
            color: "#ffc658",
          },
          {
            region: "Other",
            value: 10,
            color: "#ff8042",
          },
        ],
      })
    }, 1500)
  })
}

