import { Plus } from "lucide-react"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const userRecords: UserRecord[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "user",
    status: "inactive",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "user",
    status: "active",
  },
]

export default function UsersPage() {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage system users and their access permissions.</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inactive Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>New Users (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {userRecords.map((userRecord) => (
            <Card key={userRecord.id}>
              <CardHeader>
                <CardTitle>{userRecord.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email: {userRecord.email}</p>
                <p>Role: {userRecord.role}</p>
                <p>Status: {userRecord.status}</p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit User
                  </Button>
                  {userRecord.role === "manager" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      View Store
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
