import { defineRouting } from 'next-intl/routing'
import { Locale } from '@/types/enums/locale'

export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  localePrefix: 'always',
  localeCookie: {
    name: 'NEXT_LOCALE',
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
})

export type AppLocale = (typeof routing.locales)[number]
