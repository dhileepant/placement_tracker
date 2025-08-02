"use client"

import { useAuth } from "@/app/ClientLayout"
import { AdminDashboard } from "@/components/admin-dashboard"
import { StudentDashboard } from "@/components/student-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (user?.role === "admin") {
    return <AdminDashboard />
  }

  return <StudentDashboard />
}
