'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { Link } from '@/i18n/navigation'
import { Money } from '@/shared/Money'
import { SafeImage } from '@/shared/SafeImage'
import type { CartItem } from '@/types/cart'

type CartLineProps = {
  item: CartItem
  numberLocale: string
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export function CartLine({ item, numberLocale, onIncrease, onDecrease, onRemove }: CartLineProps) {
  const t = useTranslations('cart')

  return (
    <Row>
      <Cluster>
        <Thumb>
          <SafeImage src={item.image} alt="" />
          <Remove type="button" aria-label={t('remove')} onClick={onRemove} />
        </Thumb>
        <Info>
          <Link href={`/products/${item.id}`}>{item.title}</Link>
          <span>
            {t('unit')} <Money usd={item.price} />
          </span>
        </Info>
      </Cluster>
      <Qty>
        <button type="button" aria-label={t('decrease')} disabled={item.quantity <= 1} onClick={onDecrease}>
          −
        </button>
        <span>{item.quantity.toLocaleString(numberLocale)}</span>
        <button type="button" aria-label={t('increase')} onClick={onIncrease}>
          +
        </button>
      </Qty>
      <LinePrice>
        <Money usd={item.price * item.quantity} />
      </LinePrice>
    </Row>
  )
}

const Row = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  padding: 16px 12px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.border};
  }

  @media (max-width: 720px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`

const Cluster = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 720px) {
    grid-column: 1 / -1;
  }
`

const Thumb = styled.div`
  position: relative;
  width: 92px;
  height: 92px;
  flex: none;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  display: grid;
  place-items: center;
  padding: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Remove = styled.button`
  position: absolute;
  top: -5px;
  inset-inline-end: -5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.surface};
  background: #ef4444;
  padding: 0;
  cursor: pointer;
`

const Info = styled.div`
  display: grid;
  justify-items: start;
  gap: 6px;
  min-width: 0;

  a {
    color: inherit;
    font-weight: 800;
    line-height: 1.7;
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.accent};
  }

  span {
    color: ${({ theme }) => theme.muted};
    font-size: 13px;
  }
`

const Qty = styled.div`
  justify-self: center;
  direction: ltr;
  display: inline-flex;
  align-items: center;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.surface};
  overflow: hidden;

  button,
  span {
    min-width: 40px;
    height: 42px;
    display: grid;
    place-items: center;
  }

  button {
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-size: 18px;
  }

  button:disabled {
    color: ${({ theme }) => theme.muted};
    cursor: not-allowed;
  }

  span {
    padding: 0 4px;
    font-weight: 700;
    border-inline: 1px solid ${({ theme }) => theme.border};
  }

  @media (max-width: 720px) {
    grid-column: 1;
    grid-row: 2;
    justify-self: start;
  }
`

const LinePrice = styled.div`
  justify-self: end;
  font-weight: 800;
  font-size: 18px;
  white-space: nowrap;

  @media (max-width: 720px) {
    grid-column: 2;
    grid-row: 2;
  }
`
