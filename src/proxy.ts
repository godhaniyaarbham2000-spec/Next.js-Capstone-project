import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  // Check for NextAuth/Auth.js session cookies directly to avoid getToken version bugs
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                        request.cookies.get('__Secure-next-auth.session-token') ||
                        request.cookies.get('authjs.session-token') ||
                        request.cookies.get('__Secure-authjs.session-token');
  
  const isAuthenticated = !!sessionCookie;
  const { pathname } = request.nextUrl
  
  console.log("Middleware checking path:", pathname);
  console.log("Is Authenticated:", isAuthenticated);

  if (!isAuthenticated && (pathname.startsWith('/projects') || pathname.startsWith('/admin') || pathname.startsWith('/settings'))) {
    console.log("Redirecting to login because no token found");
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


