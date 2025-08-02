"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

interface User {
  id: string
  email: string
  role: "admin" | "student"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, we'll use localStorage to simulate auth
    const checkUser = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("demo-user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("demo-user")
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Demo authentication - in real app, use Supabase auth
    if (email === "admin@college.edu" && password === "password") {
      const adminUser = { id: "1", email, role: "admin" as const }
      setUser(adminUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("demo-user", JSON.stringify(adminUser))
      }
      return {}
    } else if (email === "john.doe@student.edu" && password === "password") {
      const studentUser = { id: "2", email, role: "student" as const }
      setUser(studentUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("demo-user", JSON.stringify(studentUser))
      }
      return {}
    } else {
      return { error: "Invalid credentials" }
    }
  }

  const signOut = async () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo-user")
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
