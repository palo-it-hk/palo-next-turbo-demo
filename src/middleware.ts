import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const identity = request.cookies.get('identity');

  if (!identity) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// allows you to filter Middleware to run on specific paths.
// config allows full regex so you can exclude certain paths.
// Must be static values, no dynamic values such as ${}
export const config = {
  matcher: ['/with-middleware', '/dashboard/:path*'],
};
