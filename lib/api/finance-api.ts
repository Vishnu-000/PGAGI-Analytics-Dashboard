// Simulated API for finance data
export async function fetchStockData(symbol: string, timeRange: string) {
  // In a real app, this would be an API call to Alpha Vantage
  return new Promise<
    {
      date: string
      price: number
      volume: number
    }[]
  >((resolve) => {
    setTimeout(() => {
      resolve(generateStockData(symbol, timeRange))
    }, 800)
  })
}

export async function fetchStockQuote(symbol: string) {
  // In a real app, this would be an API call to Alpha Vantage
  return new Promise<{
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
  }>((resolve) => {
    setTimeout(() => {
      const basePrice = getBasePrice(symbol)
      const change = (Math.random() * 10 - 5) * (basePrice / 100)
      const previousClose = basePrice - change

      resolve({
        price: basePrice,
        change,
        changePercent: (change / previousClose) * 100,
        open: previousClose + (Math.random() * 4 - 2),
        high: basePrice + Math.random() * 5,
        low: basePrice - Math.random() * 5,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        marketCap: basePrice * (Math.floor(Math.random() * 1000000000) + 10000000),
        peRatio: Math.floor(Math.random() * 30) + 10,
        dividend: Math.random() * 2,
        yield: Math.random() * 4,
        previousClose,
        fiftyTwoWeekHigh: basePrice * 1.3,
        fiftyTwoWeekLow: basePrice * 0.7,
      })
    }, 600)
  })
}

function getBasePrice(symbol: string): number {
  // Simulate different base prices for different symbols
  const symbolMap: Record<string, number> = {
    AAPL: 175.5,
    MSFT: 325.75,
    GOOGL: 140.2,
    AMZN: 130.8,
    META: 310.25,
    TSLA: 240.5,
    NVDA: 450.3,
    JPM: 145.6,
    V: 250.4,
    WMT: 60.9,
  }

  return symbolMap[symbol] || 100 + Math.random() * 200
}

function generateStockData(symbol: string, timeRange: string) {
  const data = []
  const basePrice = getBasePrice(symbol)
  let days = 30

  switch (timeRange) {
    case "1d":
      return generateIntradayData(basePrice)
    case "1w":
      days = 7
      break
    case "1m":
      days = 30
      break
    case "3m":
      days = 90
      break
    case "1y":
      days = 365
      break
    default:
      days = 30
  }

  const today = new Date()
  let currentPrice = basePrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Add some randomness to the price
    const change = (Math.random() * 6 - 3) * (basePrice / 100)
    currentPrice += change

    // Ensure price doesn't go negative
    if (currentPrice < 1) {
      currentPrice = 1 + Math.random() * 5
    }

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    })
  }

  return data
}

function generateIntradayData(basePrice: number) {
  const data = []
  const today = new Date()
  today.setHours(9, 30, 0, 0) // Market opens at 9:30 AM

  let currentPrice = basePrice

  for (let i = 0; i < 78; i++) {
    // 6.5 hours of trading in 5-minute intervals
    const date = new Date(today)
    date.setMinutes(date.getMinutes() + i * 5)

    // Add some randomness to the price
    const change = (Math.random() * 2 - 1) * (basePrice / 100)
    currentPrice += change

    // Ensure price doesn't go negative
    if (currentPrice < 1) {
      currentPrice = 1 + Math.random() * 5
    }

    data.push({
      date: date.toISOString(),
      price: Number.parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 100000) + 10000,
    })
  }

  return data
}

