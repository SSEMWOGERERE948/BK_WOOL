"use client"

import type React from "react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockStores = [
  { id: "store1", name: "Downtown Store" },
  { id: "store2", name: "Uptown Store" },
  { id: "store3", name: "Midtown Store" },
]

const mockTopProducts = [
  { product: { id: "prod1", name: "Awesome T-Shirt" }, quantity: 150, revenue: 7500, orders: 75 },
  { product: { id: "prod2", name: "Cool Jeans" }, quantity: 120, revenue: 6000, orders: 60 },
  { product: { id: "prod3", name: "Stylish Shoes" }, quantity: 100, revenue: 5000, orders: 50 },
]

const mockInventoryInsights = [
  { title: "Total Products", value: 350 },
  { title: "Out of Stock", value: 25 },
  { title: "Low Stock", value: 50 },
]

const mockPerformanceTrends = [
  { title: "Total Sales", value: "$25,000" },
  { title: "New Customers", value: 120 },
  { title: "Returning Customers", value: 80 },
  { title: "Average Order Value", value: "$125" },
]

const user = {
  role: "director", // Can be 'director' or 'store_manager'
}

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week")
  const [selectedStore, setSelectedStore] = useState("all")

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Hidden on smaller screens) */}
      <div className="hidden lg:flex lg:w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="h-full px-4 py-6">
          {/* Sidebar Content */}
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          {/* Add filter components here */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {user.role === "director" ? "Business Analytics" : "Store Analytics"}
                </h2>
                <p className="text-gray-600">Comprehensive insights into your business performance.</p>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                {user.role === "director" && (
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stores</SelectItem>
                      {mockStores.map((store) => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">$50,000</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
                <p className="text-2xl font-bold text-gray-900">250</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">Customers</h3>
                <p className="text-2xl font-bold text-gray-900">180</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">Conversion Rate</h3>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
            </div>

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Chart</h3>
                {/* Add sales chart component here */}
                <p>Sales chart will be displayed here.</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Chart</h3>
                {/* Add customer chart component here */}
                <p>Customer chart will be displayed here.</p>
              </div>
            </div>

            {/* Top Products */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
              {mockTopProducts.map((item, index) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} units sold</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold">${item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{item.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inventory Insights */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockInventoryInsights.map((item) => (
                  <div key={item.title} className="bg-white shadow rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-700">{item.title}</h4>
                    <p className="text-xl font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {mockPerformanceTrends.map((item) => (
                  <div key={item.title} className="bg-white shadow rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-700">{item.title}</h4>
                    <p className="text-xl font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsPage
