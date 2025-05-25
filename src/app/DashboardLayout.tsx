'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SidebarNav from './components/SidebarNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('oggi_token')
    if (!token) {
      router.push('/login') // redirect if not authenticated
    }
  }, [])

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="flex container gap-4">
          <SidebarNav />
          <main className="hi">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
