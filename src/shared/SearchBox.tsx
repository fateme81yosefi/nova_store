'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import styled from 'styled-components'
import { SearchIcon } from '@/assets/Icons/glyphs'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useProductQuery } from './useProductQuery'

export function SearchBox({ placement = 'header' }: { placement?: 'header' | 'menu' }) {
  const t = useTranslations('header')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { q, update } = useProductQuery()
  const [value, setValue] = useState(q)

  function applySearch(nextValue: string) {
    const query = nextValue.trim()
    if (pathname !== '/') {
      router.push(query ? `/?q=${encodeURIComponent(query)}` : '/')
      return
    }
    update({ q: query ? query : null })
  }

  useEffect(() => {
    setValue(q)
  }, [q])

  useEffect(() => {
    if (pathname !== '/' || value === q) return
    const timer = window.setTimeout(() => applySearch(value), 350)
    return () => window.clearTimeout(timer)
  }, [pathname, q, value])

  return (
    <Form
      method="get"
      action="/"
      data-placement={placement}
      onSubmit={(event) => {
        event.preventDefault()
        applySearch(value)
      }}
    >
      <button type="submit" aria-label={t('search')}>
        <SearchIcon size={18} />
      </button>
      <input
        dir={locale === 'fa' ? 'rtl' : 'ltr'}
        value={value}
        maxLength={80}
        placeholder={t('search')}
        aria-label={t('search')}
        onChange={(event) => setValue(event.target.value.slice(0, 80))}
      />
    </Form>
  )
}

const Form = styled.form`
  direction: ltr;
  flex: 0 1 320px;
  width: 320px;
  max-width: 320px;
  min-width: 0;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === 'light' ? '#F1F4F8' : theme.soft)};
  border: 0;

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    outline: none;
  }

  input::placeholder {
    color: ${({ theme }) => theme.muted};
  }

  button {
    flex: none;
    width: auto;
    height: auto;
    padding: 0;
    border: 0;
    border-radius: 0;
    display: grid;
    place-items: center;
    background: transparent;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }

  &[data-placement='menu'] {
    flex: none;
    width: 100%;
    max-width: none;
    margin: 0 0 8px;
  }

  @media (max-width: 980px) {
    &[data-placement='header'] {
      display: none;
    }
  }
`
