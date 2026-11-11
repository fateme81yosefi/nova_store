import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Suspense, type ReactNode } from 'react'
import { AppThemeProvider } from '@/context/ThemeProvider'
import { routing, type AppLocale } from '@/i18n/routing'
import { getCategories } from '@/requests/products'
import { Footer } from '@/shared/Footer'
import { Header } from '@/shared/Header'
import { StyledRegistry } from '@/shared/StyledRegistry'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    metadataBase: new URL(site),
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      siteName: 'NOVA',
      type: 'website',
    },
    alternates: {
      languages: {
        fa: '/fa',
        en: '/en',
      },
    },
    icons: { icon: '/favicon.svg' },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as AppLocale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  let categories: string[] = []
  try {
    categories = await getCategories()
  } catch {
    categories = []
  }

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <StyledRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppThemeProvider>
              <Suspense fallback={<div className="header-fallback" />}>
                <Header categories={categories} />
              </Suspense>
              {children}
              <Footer />
            </AppThemeProvider>
          </NextIntlClientProvider>
        </StyledRegistry>
      </body>
    </html>
  )
}
