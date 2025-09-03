import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  if (!authCookie?.value) {
    const containerUrl = process.env.NEXT_PUBLIC_CONTAINER_URL || 'https://your-main-app.vercel.app';
    return NextResponse.redirect(`${containerUrl}/container/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};