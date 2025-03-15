// Simulated API for overview data
export async function fetchOverviewData() {
  // In a real app, this would be an API call
  return new Promise<{
    revenue: string
    revenueChange: number
    users: string
    usersChange: number
    orders: string
    ordersChange: number
    conversionRate: string
    conversionRateChange: number
    revenueData: { date: string; value: number }[]
    usersData: { date: string; value: number }[]
    ordersData: { date: string; value: number }[]
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        revenue: "$48,352.91",
        revenueChange: 12.5,
        users: "2,420",
        usersChange: 8.2,
        orders: "1,210",
        ordersChange: -3.1,
        conversionRate: "3.8%",
        conversionRateChange: 2.4,
        revenueData: generateTimeSeriesData(30, 30000, 50000),
        usersData: generateTimeSeriesData(30, 1800, 2500),
        ordersData: generateTimeSeriesData(30, 900, 1300),
      })
    }, 1000)
  })
}

function generateTimeSeriesData(days: number, min: number, max: number): { date: string; value: number }[] {
  const data = []
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    })
  }

  return data
}

