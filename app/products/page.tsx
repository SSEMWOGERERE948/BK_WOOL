"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const user = {
  role: "director", // or 'viewer'
}

const categories = ["shampoo", "conditioner", "styling", "treatment"]

const products = [
  {
    id: 1,
    name: "Hydrating Shampoo",
    category: "shampoo",
    price: 15.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Volumizing Conditioner",
    category: "conditioner",
    price: 14.5,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Texturizing Spray",
    category: "styling",
    price: 12.75,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Deep Repair Mask",
    category: "treatment",
    price: 18.0,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Smoothing Serum",
    category: "styling",
    price: 20.0,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Color Protect Shampoo",
    category: "shampoo",
    price: 16.5,
    imageUrl: "https://via.placeholder.com/150",
  },
]

const ProductStats = () => (
  <>
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
      <p className="text-2xl font-bold text-blue-600">120</p>
    </div>
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold text-gray-800">Average Product Price</h3>
      <p className="text-2xl font-bold text-green-600">$25.50</p>
    </div>
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold text-gray-800">Most Popular Category</h3>
      <p className="text-2xl font-bold text-purple-600">Shampoo</p>
    </div>
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold text-gray-800">Out of Stock Items</h3>
      <p className="text-2xl font-bold text-red-600">5</p>
    </div>
  </>
)

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    return searchMatch && categoryMatch
  })

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Catalog</h2>
            <p className="text-gray-600">Manage your hair product inventory and specifications.</p>
          </div>
          {user.role === "director" && (
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <ProductStats />
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
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-md p-4">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
              {user.role === "director" && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Product
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
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
