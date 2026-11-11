'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { CartIcon } from '@/assets/Icons/glyphs'
import { CartEmpty } from './cart/CartEmpty'
import { CartLine } from './cart/CartLine'
import { CartSummary } from './cart/CartSummary'
import { useCartScreen } from './cart/useCartScreen'

export function CartScreen() {
  const t = useTranslations('cart')
  const cart = useCartScreen()

  return (
    <Wrap>
      <TitleRow>
        <CartIcon size={30} />
        <h1>{t('title')}</h1>
      </TitleRow>
      {!cart.hydrated || cart.items.length === 0 ? (
        <CartEmpty ready={cart.hydrated} />
      ) : (
        <>
          <List>
            {cart.items.map((item) => (
              <CartLine
                key={item.id}
                item={item}
                numberLocale={cart.numberLocale}
                onIncrease={() => cart.increase(item.id)}
                onDecrease={() => cart.decrease(item.id)}
                onRemove={() => cart.remove(item.id)}
              />
            ))}
          </List>
          <CartSummary total={cart.total} onClear={cart.clear} />
        </>
      )}
    </Wrap>
  )
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
