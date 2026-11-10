'use client'

import { useLocale } from 'next-intl'
import styled from 'styled-components'

export function Rating({ rate, count }: { rate?: number; count?: number }) {
  const locale = useLocale()
  if (rate === undefined) return null
  const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US'
  const score = new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 1 }).format(rate)
  const reviews = count === undefined ? null : new Intl.NumberFormat(numberLocale).format(count)

  return (
    <Row>
      <Star aria-hidden="true">★</Star>
      <span>{score}</span>
      {reviews ? <small>({reviews})</small> : null}
    </Row>
  )
}

const Row = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0;
  color: ${({ theme }) => theme.muted};
  font-size: 13px;
`

const Star = styled.span`
  color: #f5b400;
`
