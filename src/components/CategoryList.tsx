'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { categoryMessageKey } from '@/utils/categoryKey'

type CategoryListProps = {
  categories: string[]
  selected: string
  onSelect: (category: string | null) => void
}

export function CategoryList({ categories, selected, onSelect }: CategoryListProps) {
  const t = useTranslations()

  return (
    <Row id="categories" aria-label={t('nav.categories')}>
      <Chip type="button" aria-pressed={selected === ''} data-active={selected === ''} onClick={() => onSelect(null)}>
        {t('nav.allCategories')}
      </Chip>
      {categories.map((category) => {
        const key = categoryMessageKey(category)
        return (
          <Chip key={category} type="button" aria-pressed={selected === category} data-active={selected === category} onClick={() => onSelect(category)}>
            {key ? t(`categories.${key}`) : category}
          </Chip>
        )
      })}
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 26px 0 8px;
`

const Chip = styled.button`
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0 16px;
  cursor: pointer;

  &[data-active='true'] {
    background: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.headerText};
    border-color: ${({ theme }) => theme.header};
  }
`
