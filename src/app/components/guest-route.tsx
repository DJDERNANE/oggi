// app/_components/guest-route.tsx
'use client'

import { useAuth } from '../_context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're sure about authentication state
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading])

  // Show nothing until we know the auth state
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Only show children if NOT authenticated
  if (!isAuthenticated) {
    return <>{children}</>
  }

  // If authenticated, show nothing (will redirect)
  return null
}
