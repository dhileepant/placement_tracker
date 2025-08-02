"use client"

import { useAuth } from "@/app/ClientLayout"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <GraduationCap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Placement Tracker Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Track student placements, assessments, and progress</p>
        <Button onClick={() => router.push("/login")} size="lg" className="text-lg px-8 py-3">
          Get Started
        </Button>
      </div>
    </div>
  )
}
