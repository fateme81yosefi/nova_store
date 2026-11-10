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
  justify-content: flex-start;
  gap: 4px;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 700;
`

const Star = styled.span`
  color: #f5b400;
`
