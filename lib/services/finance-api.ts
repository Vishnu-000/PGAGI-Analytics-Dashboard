import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// This is a placeholder for a real API implementation
// In a real app, you would use the actual Alpha Vantage API
export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getStockData: builder.query({
      query: ({ symbol, timeRange }) => `stock?symbol=${symbol}&timeRange=${timeRange}`,
    }),
    getStockQuote: builder.query({
      query: (symbol) => `quote?symbol=${symbol}`,
    }),
  }),
})

export const { useGetStockDataQuery, useGetStockQuoteQuery } = financeApi

