import { DashboardLayout } from "@/components/dashboard-layout"
import { WeatherSection } from "@/components/weather/weather-section"
import { NewsSection } from "@/components/news/news-section"
import { FinanceSection } from "@/components/finance/finance-section"
import { OverviewSection } from "@/components/overview/overview-section"

export default function Home() {
  return (
    <DashboardLayout>
      <OverviewSection />
      <WeatherSection />
      <NewsSection />
      <FinanceSection />
    </DashboardLayout>
  )
}

