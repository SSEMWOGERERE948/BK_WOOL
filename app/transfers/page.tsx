"use client"

import { useState } from "react"
import { Plus, Search, ArrowLeftRight } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const mockTransfers = [
  {
    id: "1",
    product: { name: "Product A" },
    fromStore: { id: "store1", name: "Store A" },
    toStore: { id: "store2", name: "Store B" },
    quantity: 10,
    requestDate: new Date(),
    status: "pending",
    notes: "Urgent request",
  },
  {
    id: "2",
    product: { name: "Product B" },
    fromStore: { id: "store2", name: "Store B" },
    toStore: { id: "store3", name: "Store C" },
    quantity: 5,
    requestDate: new Date(),
    status: "approved",
    notes: "Awaiting shipment",
  },
  {
    id: "3",
    product: { name: "Product C" },
    fromStore: { id: "store3", name: "Store C" },
    toStore: { id: "store1", name: "Store A" },
    quantity: 15,
    requestDate: new Date(),
    status: "completed",
    notes: "Received and stocked",
  },
  {
    id: "4",
    product: { name: "Product D" },
    fromStore: { id: "store1", name: "Store A" },
    toStore: { id: "store4", name: "Store D" },
    quantity: 7,
    requestDate: new Date(),
    status: "rejected",
    notes: "Insufficient stock",
  },
]

const mockStores = [
  { id: "store1", name: "Store A" },
  { id: "store2", name: "Store B" },
  { id: "store3", name: "Store C" },
  { id: "store4", name: "Store D" },
]

const user = {
  role: "director", // Can be "director" or "manager"
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <span className="text-yellow-500">●</span>
    case "approved":
      return <span className="text-green-500">●</span>
    case "completed":
      return <span className="text-blue-500">●</span>
    case "rejected":
      return <span className="text-red-500">●</span>
    default:
      return null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return ""
  }
}

export default function TransfersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [storeFilter, setStoreFilter] = useState("all")

  const filteredTransfers = mockTransfers.filter((transfer) => {
    const searchRegex = new RegExp(searchTerm, "i")
    const matchesSearchTerm =
      searchRegex.test(transfer.product.name) ||
      searchRegex.test(transfer.fromStore.name) ||
      searchRegex.test(transfer.toStore.name)

    const matchesStatusFilter = statusFilter === "all" || transfer.status === statusFilter

    const matchesStoreFilter =
      storeFilter === "all" || transfer.fromStore.id === storeFilter || transfer.toStore.id === storeFilter

    return matchesSearchTerm && matchesStatusFilter && matchesStoreFilter
  })

  const pendingTransfers = mockTransfers.filter((transfer) => transfer.status === "pending").length
  const approvedTransfers = mockTransfers.filter((transfer) => transfer.status === "approved").length
  const completedTransfers = mockTransfers.filter((transfer) => transfer.status === "completed").length
  const rejectedTransfers = mockTransfers.filter((transfer) => transfer.status === "rejected").length

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Transfer Management</h2>
            <p className="text-gray-600">Track and manage inventory transfers between stores.</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Request Transfer
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{pendingTransfers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{approvedTransfers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
            <p className="text-2xl font-bold text-blue-600">{completedTransfers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{rejectedTransfers}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transfers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          {user.role === "director" && (
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by store" />
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

        <div className="space-y-6">
          {filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ArrowLeftRight className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{transfer.product.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-600">
                      <span>{transfer.fromStore.name}</span>
                      <ArrowLeftRight className="w-3 h-3 hidden sm:block" />
                      <span className="sm:hidden">↓</span>
                      <span>{transfer.toStore.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Requested: {transfer.requestDate.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(transfer.status)}
                    <Badge className={getStatusColor(transfer.status)}>{transfer.status}</Badge>
                  </div>
                  <p className="text-lg font-bold">{transfer.quantity} units</p>
                  {transfer.notes && <p className="text-xs text-gray-500 mt-1 max-w-xs">{transfer.notes}</p>}
                </div>
              </div>

              {transfer.status === "pending" && user.role === "director" && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 pt-4 border-t">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                    Approve Transfer
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 flex-1">
                    Reject Transfer
                  </Button>
                </div>
              )}

              {transfer.status === "approved" && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 pt-4 border-t">
                  <Button size="sm" className="flex-1">
                    Mark as Completed
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
