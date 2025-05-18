import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/my-docs', '/my-visas']
const guestRoutes = ['/login', '/signup']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isGuestRoute = guestRoutes.includes(path)
 
  const token = req.cookies.get("oggi_token")?.value;
  console.log("Token from cookies:", req.cookies.get("oggi_token")?.value);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if (
    isGuestRoute &&
    token
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}