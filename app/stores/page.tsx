import { Plus } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const storeStats = [
  { label: "Total Stores", value: "12" },
  { label: "Average Revenue", value: "$50,000" },
  { label: "Best Performing Store", value: "Downtown Branch" },
  { label: "New Stores This Month", value: "2" },
]

const stores = [
  {
    name: "Downtown Branch",
    manager: "John Smith",
    address: "123 Main St, Anytown",
    status: "Open",
  },
  {
    name: "Uptown Branch",
    manager: "Alice Johnson",
    address: "456 Oak Ave, Anytown",
    status: "Closed",
  },
]

export default function StoresPage() {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Store Management</h2>
            <p className="text-gray-600">Manage your retail locations and monitor their performance.</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Store
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {storeStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Store Locations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {stores.map((store, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Manager: {store.manager}</p>
                  <p className="text-gray-600">Address: {store.address}</p>
                  <p className="text-gray-600">Status: {store.status}</p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Store
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Contact Manager
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
