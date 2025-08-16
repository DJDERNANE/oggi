'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SidebarNav from './components/SidebarNav'
import useIsMobile from '@/lib/isMobile'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const token = Cookies.get('oggi_token')
    
    if (!token) {
      router.push('/login')
    } else {
      // Here you could add an API call to verify token validity
      setIsAuthenticated(true)
    }
  }, [router])

  if (isAuthenticated === null) {
    return <div>Loading...</div> // Or a proper loading component
  }

  if (!isAuthenticated) {
    return null // Router will handle the redirect
  }

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="flex container gap-4">
        <div className={`${isMobile && 'hidden'}`}>
          <SidebarNav />
        </div>
       
        <main className={`${isMobile ? 'w-full': 'w-[90%]'}`}>{children}</main>
      </div>
      <Footer />
    </>
  )
}