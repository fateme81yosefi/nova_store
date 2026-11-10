import { defineRouting } from 'next-intl/routing'
import { Locale } from '@/types/enums/locale'

export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  localePrefix: 'always',
})

export type AppLocale = (typeof routing.locales)[number]
