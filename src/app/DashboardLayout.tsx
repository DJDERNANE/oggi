'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SidebarNav from './components/SidebarNav'
import useIsMobile from '@/lib/isMobile'
import ProtectedRoute from './components/protected-route'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()


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