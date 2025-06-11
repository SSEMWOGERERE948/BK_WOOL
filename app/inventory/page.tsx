"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - replace with your actual data fetching
const mockUser = {
  id: "user1",
  name: "John Doe",
  role: "director", // or 'store_manager'
}

const mockStores = [
  { id: "store1", name: "Main Store" },
  { id: "store2", name: "Branch 1" },
  { id: "store3", name: "Branch 2" },
]

const mockInventory = [
  { id: "item1", name: "Product A", quantity: 100, storeId: "store1" },
  { id: "item2", name: "Product B", quantity: 50, storeId: "store1" },
  { id: "item3", name: "Product C", quantity: 75, storeId: "store2" },
  { id: "item4", name: "Product D", quantity: 25, storeId: "store2" },
  { id: "item5", name: "Product E", quantity: 120, storeId: "store3" },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStore, setSelectedStore] = useState("all")
  const user = mockUser

  const filteredInventory = mockInventory.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const storeMatch = selectedStore === "all" || item.storeId === selectedStore
    return searchMatch && storeMatch
  })

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {user.role === "director" ? "Inventory Management" : "My Store Inventory"}
            </h2>
            <p className="text-gray-600">Monitor and manage your product inventory across all locations.</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredInventory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Store: {mockStores.find((store) => store.id === item.storeId)?.name}</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Update Stock
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Request Transfer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
