// app/_components/protected-route.tsx
'use client'

import { useAuth } from '../_context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return null
}