'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { TrashIcon } from '@/assets/Icons/glyphs'
import { Money } from '@/shared/Money'
import { RateNote } from '@/shared/RateNote'

export function CartSummary({ total, onClear }: { total: number; onClear: () => void }) {
  const t = useTranslations('cart')

  return (
    <Summary>
      <Total>
        <Money usd={total} />
      </Total>
      <RateNote />
      <Actions>
        <Checkout type="button" disabled>
          {t('checkout')}
        </Checkout>
        <Clear type="button" onClick={onClear}>
          <span>{t('clear')}</span>
          <TrashIcon />
        </Clear>
      </Actions>
    </Summary>
  )
}

const Summary = styled.section`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 22px;
  display: grid;
  gap: 18px;
`

const Total = styled.p`
  margin: 0;
  font-size: 26px;
  font-weight: 800;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Checkout = styled.button`
  width: min(100%, 540px);
  height: 52px;
  border: 0;
  border-radius: 14px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;

  &:disabled {
    opacity: 1;
    cursor: default;
  }
`

const Clear = styled.button`
  margin-inline-start: auto;
  height: 48px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.muted};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;

  @media (max-width: 720px) {
    margin-inline-start: 0;
    justify-content: center;
  }
`
