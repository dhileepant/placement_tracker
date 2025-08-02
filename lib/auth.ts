"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "./supabase"

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
    // Check if user is logged in
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        // Fetch user role from our users table
        const { data: userData } = await supabase.from("users").select("role").eq("email", session.user.email).single()

        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: userData?.role || "student",
        })
      }
      setLoading(false)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase.from("users").select("role").eq("email", session.user.email).single()

        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: userData?.role || "student",
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
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
