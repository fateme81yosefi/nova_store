import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')
const root = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // پوشه Projects چند lockfile دارد و Next ریشه را اشتباه حدس می‌زد
  turbopack: {
    root,
  },
}

export default withNextIntl(nextConfig)
