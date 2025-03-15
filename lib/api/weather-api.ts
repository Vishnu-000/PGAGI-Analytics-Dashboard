// Simulated API for weather data
export async function fetchWeatherData(location: string) {
  // In a real app, this would be an API call to OpenWeatherMap
  return new Promise<{
    location: string
    temperature: number
    feelsLike: number
    humidity: number
    windSpeed: number
    weatherCode: number
    description: string
    uvIndex: number
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        location: location === "New York" ? "New York, US" : location,
        temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
        feelsLike: Math.floor(Math.random() * 15) + 8, // 8-23°C
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        weatherCode: [800, 801, 802, 500, 501, 300, 200][Math.floor(Math.random() * 7)],
        description: [
          "Clear Sky",
          "Few Clouds",
          "Scattered Clouds",
          "Light Rain",
          "Moderate Rain",
          "Drizzle",
          "Thunderstorm",
        ][Math.floor(Math.random() * 7)],
        uvIndex: Math.floor(Math.random() * 8) + 1, // 1-8
      })
    }, 800)
  })
}

export async function fetchForecastData(location: string) {
  // In a real app, this would be an API call to OpenWeatherMap
  return new Promise<{
    daily: {
      date: string
      temperature: number
      weatherCode: number
      description: string
      precipitation: number
      windSpeed: number
    }[]
    hourly: {
      date: string
      time: string
      temperature: number
      weatherCode: number
      description: string
      precipitation: number
      windSpeed: number
    }[]
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        daily: generateDailyForecast(),
        hourly: generateHourlyForecast(),
      })
    }, 1000)
  })
}

function generateDailyForecast() {
  const forecast = []
  const today = new Date()
  const weatherCodes = [800, 801, 802, 500, 501, 300, 200]
  const descriptions = [
    "Clear Sky",
    "Few Clouds",
    "Scattered Clouds",
    "Light Rain",
    "Moderate Rain",
    "Drizzle",
    "Thunderstorm",
  ]

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)

    const weatherIndex = Math.floor(Math.random() * 7)

    forecast.push({
      date: date.toISOString().split("T")[0],
      temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
      weatherCode: weatherCodes[weatherIndex],
      description: descriptions[weatherIndex],
      precipitation: Math.floor(Math.random() * 70) + 10, // 10-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    })
  }

  return forecast
}

function generateHourlyForecast() {
  const forecast = []
  const today = new Date()
  today.setHours(today.getHours() - (today.getHours() % 3))
  today.setMinutes(0)
  today.setSeconds(0)

  const weatherCodes = [800, 801, 802, 500, 501, 300, 200]
  const descriptions = [
    "Clear Sky",
    "Few Clouds",
    "Scattered Clouds",
    "Light Rain",
    "Moderate Rain",
    "Drizzle",
    "Thunderstorm",
  ]

  for (let i = 0; i < 24; i += 3) {
    const date = new Date(today)
    date.setHours(date.getHours() + i)

    const weatherIndex = Math.floor(Math.random() * 7)

    forecast.push({
      date: date.toISOString().split("T")[0],
      time: date.toTimeString().split(" ")[0].substring(0, 5),
      temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
      weatherCode: weatherCodes[weatherIndex],
      description: descriptions[weatherIndex],
      precipitation: Math.floor(Math.random() * 70) + 10, // 10-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    })
  }

  return forecast
}

