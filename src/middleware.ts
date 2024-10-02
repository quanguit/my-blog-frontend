import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/', '/blog', '/contact'];

export function middleware(request: NextRequest) {
  const jwt = cookies().get('jwt');
  const { pathname } = request.nextUrl;

  if (jwt && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!jwt && privateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
