// app/_context/auth-context.tsx
'use client'
import Cookies from "js-cookie";
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check auth status on initial load
    const token = Cookies.get("oggi_token")
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    Cookies.set("oggi_token", token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove("oggi_token")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}