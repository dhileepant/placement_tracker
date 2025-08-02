"use client"

import { BarChart3, BookOpen, Building2, FileText, GraduationCap, Home, LogOut, Settings, User, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/app/ClientLayout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: BookOpen,
  },
  {
    title: "Placements",
    url: "/placements",
    icon: Building2,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
]

const studentMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: BookOpen,
  },
  {
    title: "Placement Status",
    url: "/placement-status",
    icon: Building2,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const menuItems = user?.role === "admin" ? adminMenuItems : studentMenuItems

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Placement Tracker</h2>
            <p className="text-sm text-muted-foreground capitalize">{user?.role} Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t px-4 py-4">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button 
              variant="ghost" 
              className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground" 
              onClick={signOut}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
