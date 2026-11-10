'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styled from 'styled-components'
import { ThemeMode } from '@/types/enums/theme'
import { SortKey } from '@/types/enums/sort'

type SortOption = {
  value: SortKey
  label: string
}

export function SortMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: SortKey
  options: SortOption[]
  onChange: (value: SortKey) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const listId = useId()
  const current = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    const selected = menuRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')
    selected?.focus()

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function moveFocus(currentIndex: number, direction: 1 | -1) {
    const next = Math.max(0, Math.min(options.length - 1, currentIndex + direction))
    menuRef.current?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

  return (
    <Root ref={rootRef}>
      <Caption>{label}:</Caption>
      <TriggerWrap>
        <Trigger
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          <span>{current?.label}</span>
          <Chevron $open={open} />
        </Trigger>
        {open ? (
          <Menu ref={menuRef} id={listId} role="listbox" aria-label={label}>
            {options.map((option, index) => (
              <li key={option.value} role="presentation">
                <Option
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  data-active={option.value === value}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      moveFocus(index, 1)
                    }
                    if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      moveFocus(index, -1)
                    }
                  }}
                >
                  {option.label}
                </Option>
              </li>
            ))}
          </Menu>
        ) : null}
      </TriggerWrap>
    </Root>
  )
}

function Chevron({ $open }: { $open: boolean }) {
  return (
    <Caret $open={$open} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 9.2 12 14.8l5.5-5.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Caret>
  )
}

const Root = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  height: 52px;
  padding: 4px;
  padding-inline-start: 18px;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#F4F6FA' : theme.soft)};
  border: 1px solid ${({ theme }) => (theme.mode === ThemeMode.Light ? '#E6EAF1' : theme.border)};
  box-shadow: ${({ theme }) => (theme.mode === ThemeMode.Light ? '0 8px 22px rgba(26, 39, 68, 0.05)' : 'none')};
`

const Caption = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
`

const TriggerWrap = styled.div`
  position: relative;
  min-width: 0;
`

const Caret = styled.svg<{ $open: boolean }>`
  flex: none;
  transition: transform 160ms ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'none')};
`

const Trigger = styled.button`
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === ThemeMode.Light ? '#FFFFFF' : theme.surface)};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => (theme.mode === ThemeMode.Light ? '0 1px 2px rgba(26, 39, 68, 0.06)' : 'none')};
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-inline: 16px 14px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }
`

const Menu = styled.ul`
  position: absolute;
  z-index: 8;
  top: calc(100% + 8px);
  inset-inline-end: 0;
  min-width: 100%;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: 16px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
`

const Option = styled.button`
  width: 100%;
  height: 38px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  padding-inline: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: start;
  white-space: nowrap;
  cursor: pointer;

  &[data-active='true'],
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.soft};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: -2px;
  }
`
