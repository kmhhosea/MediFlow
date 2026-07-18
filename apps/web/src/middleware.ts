import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  if (!session) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/patients/:path*', '/appointments/:path*', '/billing/:path*', '/admin/:path*'] };
