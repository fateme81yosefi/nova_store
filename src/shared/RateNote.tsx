'use client'

import { useLocale, useTranslations } from 'next-intl'
import styled from 'styled-components'
import { useUsdRate } from '@/context/ExchangeRate'
import { formatRate } from '@/utils/formatPrice'

export function RateNote() {
  const t = useTranslations('currency')
  const locale = useLocale()
  const rate = useUsdRate()
  const amount = formatRate(rate.tomanPerDollar, locale)
  const time = rate.updatedAt ? formatUpdated(rate.updatedAt, locale) : ''

  return (
    <Note>
      {t(rate.live ? 'rateNote' : 'rateFallback', { rate: amount, time })}
      {rate.live && rate.sourceUrl ? (
        <>
          {' '}
          <Source href={rate.sourceUrl} target="_blank" rel="noreferrer">
            {t('rateSource')}
          </Source>
        </>
      ) : null}
    </Note>
  )
}

function formatUpdated(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    timeZone: 'Asia/Tehran',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

const Note = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.muted};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.7;
`

const Source = styled.a`
  color: inherit;
  font-weight: 700;
  text-underline-offset: 3px;
`
