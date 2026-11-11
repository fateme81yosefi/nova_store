const productApi = 'https://fakestoreapi.com'
const rateApi = 'https://nerkhara.com'

function contentSecurityPolicy() {
  const dev = process.env.NODE_ENV !== 'production'
  const script = ["'self'", "'unsafe-inline'", ...(dev ? ["'unsafe-eval'"] : [])]
  const connect = ["'self'", productApi, rateApi, ...(dev ? ['ws:', 'http://localhost:3000', 'http://127.0.0.1:3000'] : [])]

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src ${script.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://fakestoreapi.com",
    "font-src 'self'",
    `connect-src ${connect.join(' ')}`,
    ...(dev ? [] : ['upgrade-insecure-requests']),
  ].join('; ')
}

export function securityHeaders() {
  const headers = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  ]

  if ((process.env.NEXT_PUBLIC_SITE_URL ?? '').startsWith('https://')) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains',
    })
  }

  return headers
}
