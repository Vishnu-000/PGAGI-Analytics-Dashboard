import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// This is a placeholder for a real API implementation
// In a real app, you would use the actual NewsAPI
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, page }) => `news?category=${category}&page=${page}`,
    }),
  }),
})

export const { useGetNewsQuery } = newsApi

