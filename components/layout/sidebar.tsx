"use client"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Package,
  Store,
  TrendingUp,
  ShoppingCart,
  ArrowLeftRight,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const directorNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/stores", label: "Stores", icon: Store },
  { href: "/inventory", label: "Inventory", icon: TrendingUp },
  { href: "/sales", label: "Sales", icon: ShoppingCart },
  { href: "/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/users", label: "Users", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
]

const managerNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "My Inventory", icon: TrendingUp },
  { href: "/sales", label: "Sales", icon: ShoppingCart },
  { href: "/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/analytics", label: "My Analytics", icon: BarChart3 },
]

function AppSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const { setOpenMobile, isMobile } = useSidebar()

  if (!user) return null

  const navItems = user.role === "director" ? directorNavItems : managerNavItems

  const handleNavClick = () => {
    // Close sidebar on mobile when navigation item is clicked
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleLogout = () => {
    // Close sidebar on mobile before logout
    if (isMobile) {
      setOpenMobile(false)
    }
    logout()
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">BK WOOL</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href} onClick={handleNavClick}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center space-x-3 px-2 py-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-gray-600 hover:text-gray-900 mx-2"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
