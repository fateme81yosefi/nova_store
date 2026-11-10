'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { Link } from '@/i18n/navigation'
import { categoryMessageKey } from '@/utils/categoryKey'

type MobileMenuProps = {
  categories: string[]
  onClose: () => void
  onPickCategory: (category: string | null) => void
}

export function MobileMenu({ categories, onClose, onPickCategory }: MobileMenuProps) {
  const t = useTranslations()

  return (
    <Overlay onClick={onClose}>
      <Panel onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={t('header.openMenu')}>
        <Close type="button" onClick={onClose}>
          {t('header.closeMenu')}
        </Close>
        <Link href="/" onClick={onClose}>
          {t('nav.home')}
        </Link>
        <a href="#products" onClick={onClose}>
          {t('nav.products')}
        </a>
        <button type="button" onClick={() => onPickCategory(null)}>
          {t('nav.allCategories')}
        </button>
        {categories.map((category) => {
          const key = categoryMessageKey(category)
          return (
            <button key={category} type="button" onClick={() => onPickCategory(category)}>
              {key ? t(`categories.${key}`) : category}
            </button>
          )
        })}
        <Link href="/cart" onClick={onClose}>
          {t('header.cart')}
        </Link>
      </Panel>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(9, 15, 26, 0.55);
  z-index: 30;
  display: flex;
  justify-content: flex-end;
`

const Panel = styled.div`
  width: min(320px, 86vw);
  height: 100%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: grid;
  align-content: start;
  gap: 8px;

  a,
  button {
    text-align: start;
    background: transparent;
    border: 0;
    color: inherit;
    padding: 12px 8px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }
`

const Close = styled.button`
  font-weight: 700;
  color: ${({ theme }) => theme.accent} !important;
`
