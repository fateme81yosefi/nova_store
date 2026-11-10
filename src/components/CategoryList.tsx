'use client'

import { useTranslations } from 'next-intl'
import styled from 'styled-components'
import { DiamondIcon, GridIcon, HomeIcon, LaptopIcon, ShirtIcon } from '@/assets/Icons/glyphs'
import { ThemeMode } from '@/types/enums/theme'

type CategoryListProps = {
  categories: string[]
  selected: string
  onSelect: (category: string | null) => void
}

const clothingValues = ["clothing", "men's clothing", "women's clothing"]

export function CategoryList({ selected, onSelect }: CategoryListProps) {
  const t = useTranslations()
  const clothingActive = clothingValues.includes(selected)
  const digitalActive = selected === 'digital' || selected === 'electronics'
  const jeweleryActive = selected === 'jewelery'

  return (
    <>
      <Row id="categories" aria-label={t('nav.categories')}>
        <Chip type="button" aria-pressed={selected === ''} data-active={selected === ''} onClick={() => onSelect(null)}>
          <HomeIcon />
          <span>{t('nav.allCategories')}</span>
        </Chip>
        <Chip type="button" aria-pressed={digitalActive} data-active={digitalActive} onClick={() => onSelect('electronics')}>
          <LaptopIcon size={18} />
          <span>{t('categories.electronics')}</span>
        </Chip>
        <Chip type="button" aria-pressed={jeweleryActive} data-active={jeweleryActive} onClick={() => onSelect('jewelery')}>
          <DiamondIcon />
          <span>{t('categories.jewelery')}</span>
        </Chip>
        <Chip type="button" aria-pressed={clothingActive} data-active={clothingActive} onClick={() => onSelect('clothing')}>
          <ShirtIcon size={18} />
          <span>{t('categories.clothing')}</span>
        </Chip>
      </Row>
      <MobileGrid aria-label={t('nav.categories')}>
        <MobileCard type="button" aria-pressed={selected === ''} data-active={selected === ''} onClick={() => onSelect(null)}>
          <GridIcon />
          <span>{t('nav.all')}</span>
        </MobileCard>
        <MobileCard type="button" aria-pressed={digitalActive} data-active={digitalActive} onClick={() => onSelect('electronics')}>
          <LaptopIcon />
          <span>{t('categories.electronics')}</span>
        </MobileCard>
        <MobileCard type="button" aria-pressed={clothingActive} data-active={clothingActive} onClick={() => onSelect('clothing')}>
          <ShirtIcon />
          <span>{t('categories.clothing')}</span>
        </MobileCard>
      </MobileGrid>
    </>
  )
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 22px 0 8px;
  scroll-margin-top: 96px;

  @media (max-width: 767px) {
    display: none;
  }
`

const Chip = styled.button`
  min-height: 48px;
  border-radius: 999px;
  border: 0;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#E8EDF5' : theme.soft)};
  color: ${({ theme }) => theme.text};
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &[data-active='true'] {
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

const MobileGrid = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 16px 0 4px;
  }
`

const MobileCard = styled.button`
  min-height: 104px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 6px;
  cursor: pointer;

  span {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
  }

  &[data-active='true'] {
    box-shadow: ${({ theme }) => theme.shadow};
  }
`
