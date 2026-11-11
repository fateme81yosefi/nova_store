import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { securityHeaders } from './src/security/headers'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')
const root = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    root,
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders(),
      },
    ]
  },
}

export default withNextIntl(nextConfig)
