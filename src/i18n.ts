import { getRequestConfig } from 'next-intl/server'
import { routing, type AppLocale } from './i18n/routing'

function resolveLocale(value: string | undefined): AppLocale {
  if (value && routing.locales.includes(value as AppLocale)) return value as AppLocale
  return routing.defaultLocale
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale)

  return {
    locale,
    messages: (await import(`./dictionary/${locale}.json`)).default,
  }
})
