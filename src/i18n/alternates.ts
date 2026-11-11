import type { Metadata } from 'next'
import { routing } from './routing'

export function localeAlternates(locale: string, pathname = '/'): NonNullable<Metadata['alternates']> {
  const path = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
  const languages: NonNullable<Metadata['alternates']>['languages'] = {}
  for (const item of routing.locales) {
    languages[item] = `/${item}${path}`
  }

  return {
    canonical: `/${locale}${path}`,
    languages,
  }
}
