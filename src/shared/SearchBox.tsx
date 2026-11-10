'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useProductQuery } from './useProductQuery'

export function SearchBox() {
  const t = useTranslations('header')
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
      onSubmit={(event) => {
        event.preventDefault()
        applySearch(value)
      }}
    >
      <input
        value={value}
        placeholder={t('search')}
        aria-label={t('search')}
        onChange={(event) => setValue(event.target.value)}
      />
    </Form>
  )
}

const Form = styled.form`
  flex: 1 1 220px;
  min-width: 0;

  input {
    width: 100%;
    height: 42px;
    border: 0;
    border-radius: 999px;
    padding: 0 16px;
    background: #fff;
    color: #142033;
  }

  @media (max-width: 767px) {
    flex-basis: 100%;
    order: 5;
  }
`
