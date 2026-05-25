import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Temporariamente liberado para permitir visualização offline do front-end sem precisar rodar a API de backend
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/teachers/:path*',
    '/admin/:path*',
    '/subjects/:path*',
  ],
};
