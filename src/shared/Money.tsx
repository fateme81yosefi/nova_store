'use client'

import { useLocale, useTranslations } from 'next-intl'
import { formatToman } from '@/utils/formatPrice'

export function Money({ usd }: { usd: number }) {
  const locale = useLocale()
  const t = useTranslations('currency')
  return (
    <span>
      {formatToman(usd, locale)} {t('toman')}
    </span>
  )
}
