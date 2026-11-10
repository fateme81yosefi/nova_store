'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import styled from 'styled-components'
import { CartIcon, TrashIcon } from '@/assets/Icons/glyphs'
import { Link } from '@/i18n/navigation'
import { cartTotal, useCart } from '@/storage/cartStore'
import { Money } from '@/shared/Money'
import { Locale } from '@/types/enums/locale'

export function CartScreen() {
  const t = useTranslations('cart')
  const locale = useLocale()
  const items = useCart((state) => state.items)
  const increase = useCart((state) => state.increase)
  const decrease = useCart((state) => state.decrease)
  const remove = useCart((state) => state.remove)
  const clear = useCart((state) => state.clear)
  const hydrated = useHydrated()
  const total = cartTotal(items)
  const numberLocale = locale === Locale.Fa ? 'fa-IR' : 'en-US'

  return (
    <Wrap>
      <TitleRow>
        <CartIcon size={30} />
        <h1>{t('title')}</h1>
      </TitleRow>
      {!hydrated || items.length === 0 ? (
        <Empty>
          {hydrated ? (
            <>
              <EmptyBag />
              <p>{t('empty')}</p>
              <Link href="/">{t('browse')}</Link>
            </>
          ) : null}
        </Empty>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <Row key={item.id}>
                <Cluster>
                  <Thumb>
                    <img src={item.image} alt="" />
                    <Remove type="button" aria-label={t('remove')} onClick={() => remove(item.id)} />
                  </Thumb>
                  <Info>
                    <strong>{item.title}</strong>
                    <span>
                      {t('unit')} <Money usd={item.price} />
                    </span>
                  </Info>
                </Cluster>
                <Qty>
                  <button type="button" aria-label={t('decrease')} disabled={item.quantity <= 1} onClick={() => decrease(item.id)}>
                    −
                  </button>
                  <span>{item.quantity.toLocaleString(numberLocale)}</span>
                  <button type="button" aria-label={t('increase')} onClick={() => increase(item.id)}>
                    +
                  </button>
                </Qty>
                <LinePrice>
                  <Money usd={item.price * item.quantity} />
                </LinePrice>
              </Row>
            ))}
          </List>
          <Summary>
            <Total>
              <Money usd={total} />
            </Total>
            <Actions>
              <Checkout type="button" disabled>
                {t('checkout')}
              </Checkout>
              <Clear type="button" onClick={clear}>
                <span>{t('clear')}</span>
                <TrashIcon />
              </Clear>
            </Actions>
          </Summary>
        </>
      )}
    </Wrap>
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

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(useCart.persist.hasHydrated())
    return useCart.persist.onFinishHydration(() => setHydrated(true))
  }, [])

  return hydrated
}

const Wrap = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 6px 8px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadow};
`

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

  strong {
    font-weight: 800;
    line-height: 1.7;
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
