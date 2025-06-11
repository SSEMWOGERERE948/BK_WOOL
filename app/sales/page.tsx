"use client"

import { useState } from "react"
import { Calendar, Plus, Search, ShoppingCart, User } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockSales = [
  {
    id: "1",
    product: { name: "Awesome T-Shirt" },
    salesDate: new Date(),
    customerName: "John Doe",
    totalAmount: 25.0,
    quantity: 1,
    unitPrice: 25.0,
    store: { id: "store1", name: "Main Store" },
  },
  {
    id: "2",
    product: { name: "Cool Mug" },
    salesDate: new Date(),
    customerName: "Jane Smith",
    totalAmount: 15.0,
    quantity: 2,
    unitPrice: 7.5,
    store: { id: "store2", name: "Branch Store" },
  },
  {
    id: "3",
    product: { name: "Fancy Hat" },
    salesDate: new Date(),
    customerName: null,
    totalAmount: 20.0,
    quantity: 1,
    unitPrice: 20.0,
    store: { id: "store1", name: "Main Store" },
  },
]

const mockStores = [
  { id: "store1", name: "Main Store" },
  { id: "store2", name: "Branch Store" },
]

const mockUser = {
  role: "director", // Can be 'director' or 'salesperson'
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStore, setSelectedStore] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const user = mockUser

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {user.role === "director" ? "Sales Management" : "My Store Sales"}
            </h2>
            <p className="text-gray-600">Track and analyze sales performance across all locations.</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Record Sale
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Sales Summary Cards - To be implemented */}
          <div>Sales Summary Card 1</div>
          <div>Sales Summary Card 2</div>
          <div>Sales Summary Card 3</div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
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
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {mockSales.map((sale) => (
            <div
              key={sale.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{sale.product.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 space-y-1 sm:space-y-0">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{sale.salesDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{sale.customerName || "Walk-in Customer"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-medium">${sale.totalAmount}</div>
                <div className="text-sm text-gray-500">
                  {sale.quantity} × ${sale.unitPrice}
                </div>
                <Badge variant="outline" className="mt-1">
                  {sale.store.name}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
