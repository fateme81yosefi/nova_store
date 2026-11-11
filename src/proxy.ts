import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { securityHeaders } from './security/headers'
import { routing } from './i18n/routing'

const handleI18n = createMiddleware(routing)

function applySecurityHeaders(response: NextResponse) {
  for (const header of securityHeaders()) {
    response.headers.set(header.key, header.value)
  }
  return response
}

export default function proxy(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (request.method === 'OPTIONS' && origin && origin !== request.nextUrl.origin) {
    return applySecurityHeaders(new NextResponse(null, { status: 403 }))
  }

  return applySecurityHeaders(handleI18n(request))
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
