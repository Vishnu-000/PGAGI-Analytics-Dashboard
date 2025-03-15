"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Search, MapPin, Wind, Droplets, Thermometer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchWeatherData, fetchForecastData } from "@/lib/api/weather-api"
import { WeatherForecast } from "@/components/weather/weather-forecast"
import { WeatherAnimation } from "@/components/weather/weather-animation"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/ui/section-header"

export function WeatherSection() {
  const [location, setLocation] = useState("New York")
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeatherData(location),
    enabled: !!location,
  })

  const { data: forecastData, isLoading: isForecastLoading } = useQuery({
    queryKey: ["forecast", location],
    queryFn: () => fetchForecastData(location),
    enabled: !!location,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLocation(searchQuery)
      setSearchQuery("")
    }
  }

  const handleUseCurrentLocation = () => {
    if (userLocation) {
      setLocation(`${userLocation.latitude},${userLocation.longitude}`)
    }
  }

  return (
    <section className="mb-8 space-y-4">
      <SectionHeader
        title="Weather Dashboard"
        description="Current weather conditions and forecast for your location."
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Weather Information</CardTitle>
              <CardDescription>Check current conditions and forecast</CardDescription>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              {userLocation && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleUseCurrentLocation}
                  title="Use current location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </CardHeader>
        <CardContent>
          {isWeatherLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          ) : weatherData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 md:grid-cols-2"
            >
              <div className="flex flex-col items-center justify-center rounded-lg bg-accent/50 p-6 text-center">
                <WeatherAnimation weatherCode={weatherData.weatherCode} />
                <h3 className="mt-4 text-3xl font-bold">{weatherData.temperature}°C</h3>
                <p className="text-lg font-medium">{weatherData.description}</p>
                <p className="text-sm text-muted-foreground">{weatherData.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-background/50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Thermometer className="mb-2 h-8 w-8 text-orange-500" />
                    <p className="text-sm font-medium">Feels Like</p>
                    <p className="text-2xl font-bold">{weatherData.feelsLike}°C</p>
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Droplets className="mb-2 h-8 w-8 text-blue-500" />
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Wind className="mb-2 h-8 w-8 text-cyan-500" />
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                  </CardContent>
                </Card>

                <Card className="bg-background/50">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-2 h-8 w-8 text-purple-500"
                    >
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                    <p className="text-sm font-medium">UV Index</p>
                    <p className="text-2xl font-bold">{weatherData.uvIndex}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
              <p>Failed to load weather data. Please try again later.</p>
            </div>
          )}

          {isForecastLoading ? (
            <Skeleton className="mt-6 h-[300px] w-full" />
          ) : forecastData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              <Tabs defaultValue="daily">
                <TabsList className="mb-4">
                  <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
                  <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
                </TabsList>
                <TabsContent value="daily">
                  <WeatherForecast data={forecastData.daily} type="daily" />
                </TabsContent>
                <TabsContent value="hourly">
                  <WeatherForecast data={forecastData.hourly} type="hourly" />
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}

