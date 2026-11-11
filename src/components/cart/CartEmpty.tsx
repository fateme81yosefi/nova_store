'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { Link } from '@/i18n/navigation'

export function CartEmpty({ ready }: { ready: boolean }) {
  const t = useTranslations('cart')

  return (
    <Empty>
      {ready ? (
        <>
          <EmptyBag />
          <p>{t('empty')}</p>
          <Link href="/">{t('browse')}</Link>
        </>
      ) : null}
    </Empty>
  )
}

function EmptyBag() {
  return (
    <EmptyArt viewBox="0 0 120 112" aria-hidden="true">
      <path className="handle" d="M43 52V36.5a17 17 0 0 1 34 0V52" />
      <path className="bag" d="M22 50h76l-5.4 46.8a6.5 6.5 0 0 1-6.4 5.7H33.8a6.5 6.5 0 0 1-6.4-5.7L22 50z" />
    </EmptyArt>
  )
}

const EmptyArt = styled.svg`
  width: 108px;
  height: 100px;

  .bag {
    fill: ${({ theme }) => theme.accent};
  }

  .handle {
    fill: none;
    stroke: ${({ theme }) => theme.text};
    stroke-width: 3.6;
    stroke-linecap: round;
  }
`

const Empty = styled.div`
  min-height: 280px;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
  gap: 8px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 22px;
  padding: 28px;

  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
  }

  a {
    margin-top: 8px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    font-weight: 700;
  }
`
