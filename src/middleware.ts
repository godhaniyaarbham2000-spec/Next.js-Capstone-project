import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
  const { pathname } = request.nextUrl

  if (!token && (pathname.startsWith('/projects') || pathname.startsWith('/admin') || pathname.startsWith('/settings'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const response = NextResponse.next()
  response.headers.set('x-request-id', crypto.randomUUID())
  
  // Rate limiting stub for login
  if (pathname === '/api/auth/callback/credentials') {
    // Basic rate limiting logic could go here
  }
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}


