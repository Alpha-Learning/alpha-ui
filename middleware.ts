import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle CORS for API routes
  const response = NextResponse.next();
  
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    "https://alpheraacademy.edu.bh",
    "https://www.alpheraacademy.edu.bh",
    "http://localhost:4035",
  ];

  // Only apply CORS to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};

