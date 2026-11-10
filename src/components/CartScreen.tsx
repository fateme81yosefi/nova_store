'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { Link } from '@/i18n/navigation'
import { cartTotal, useCart } from '@/storage/cartStore'
import { Money } from '@/shared/Money'

export function CartScreen() {
  const t = useTranslations('cart')
  const items = useCart((state) => state.items)
  const increase = useCart((state) => state.increase)
  const decrease = useCart((state) => state.decrease)
  const remove = useCart((state) => state.remove)
  const clear = useCart((state) => state.clear)
  const total = cartTotal(items)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <Empty>
        <img src="/empty-box.svg" alt="" width={92} height={70} />
        <h1>{t('title')}</h1>
        <p>{t('empty')}</p>
        <Link href="/">{t('browse')}</Link>
      </Empty>
    )
  }

  return (
    <Layout>
      <div>
        <Heading>
          <h1>{t('title')}</h1>
          <button type="button" onClick={clear}>
            {t('clear')}
          </button>
        </Heading>
        <List>
          {items.map((item) => (
            <Row key={item.id}>
              <img src={item.image} alt={item.title} />
              <Info>
                <strong>{item.title}</strong>
                <span>
                  {t('unit')}: <Money usd={item.price} />
                </span>
                <Qty>
                  <button type="button" aria-label={t('decrease')} disabled={item.quantity <= 1} onClick={() => decrease(item.id)}>
                    −
                  </button>
                  <span aria-label={t('qty')}>{item.quantity}</span>
                  <button type="button" aria-label={t('increase')} onClick={() => increase(item.id)}>
                    +
                  </button>
                </Qty>
              </Info>
              <Side>
                <Money usd={item.price * item.quantity} />
                <button type="button" onClick={() => remove(item.id)}>
                  {t('remove')}
                </button>
              </Side>
            </Row>
          ))}
        </List>
      </div>
      <Summary>
        <h2>{t('summary')}</h2>
        <Line>
          <span>{t('items')}</span>
          <span>{count}</span>
        </Line>
        <Line>
          <span>{t('total')}</span>
          <strong>
            <Money usd={total} />
          </strong>
        </Line>
        <Checkout type="button" disabled>
          {t('checkout')}
        </Checkout>
        <small>{t('checkoutNote')}</small>
      </Summary>
    </Layout>
  )
}

const Layout = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.7fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  h1 {
    margin: 0;
  }

  button {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.accent};
    cursor: pointer;
    font-weight: 700;
  }
`

const List = styled.ul`
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
`

const Row = styled.li`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 12px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 12px;

  img {
    width: 84px;
    height: 84px;
    object-fit: contain;
    background: ${({ theme }) => theme.soft};
    border-radius: 12px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 72px minmax(0, 1fr);
  }
`

const Info = styled.div`
  display: grid;
  align-content: start;
  gap: 6px;
  min-width: 0;

  strong {
    line-height: 1.6;
  }

  span {
    color: ${({ theme }) => theme.muted};
    font-size: 13px;
  }
`

const Qty = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Side = styled.div`
  display: grid;
  justify-items: end;
  align-content: space-between;
  gap: 8px;
  font-weight: 800;

  button {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.muted};
    cursor: pointer;
  }
`

const Summary = styled.aside`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 18px;
  }

  small {
    color: ${({ theme }) => theme.muted};
    line-height: 1.7;
  }

  @media (min-width: 901px) {
    position: sticky;
    top: 88px;
  }
`

const Line = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

const Checkout = styled.button`
  height: 46px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;
  opacity: 0.55;
`

const Empty = styled.div`
  min-height: 360px;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
  gap: 8px;

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
