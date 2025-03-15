import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SidebarNav from "../components/SidebarNav"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <div className="navbar">
            <Navbar />
          </div>
          <div  className="flex container gap-4">
            <>
              <SidebarNav />
            </>
            <main>{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    )
  }