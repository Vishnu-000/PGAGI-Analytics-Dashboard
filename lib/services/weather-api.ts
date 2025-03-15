import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// This is a placeholder for a real API implementation
// In a real app, you would use the actual OpenWeatherMap API
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (location) => `weather?location=${location}`,
    }),
    getForecast: builder.query({
      query: (location) => `forecast?location=${location}`,
    }),
  }),
})

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi

