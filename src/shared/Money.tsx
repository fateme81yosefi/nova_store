'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useUsdRate } from '@/context/ExchangeRate'
import { formatToman } from '@/utils/formatPrice'

export function Money({ usd }: { usd: number }) {
  const locale = useLocale()
  const t = useTranslations('currency')
  const { tomanPerDollar } = useUsdRate()
  return (
    <span>
      {formatToman(usd, locale, tomanPerDollar)} {t('toman')}
    </span>
  )
}
