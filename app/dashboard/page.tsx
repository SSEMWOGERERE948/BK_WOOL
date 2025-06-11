"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { InventoryAlerts } from "@/components/dashboard/inventory-alerts"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    redirect("/")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Monitor your inventory performance and key metrics.</p>
              </div>

              <MetricsCards />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2">
                  <RecentActivity />
                </div>
                <div className="xl:col-span-1">
                  <InventoryAlerts />
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
