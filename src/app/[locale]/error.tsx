'use client'

import { useTranslations } from 'next-intl'

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('common')

  return (
    <main style={{ textAlign: 'center', padding: 48 }}>
      <p>{t('error')}</p>
      <button type="button" onClick={reset}>
        {t('retry')}
      </button>
    </main>
  )
}
