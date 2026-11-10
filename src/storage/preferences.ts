import { StorageKey } from '@/types/enums/storageKey'
import { ThemeMode } from '@/types/enums/theme'

export function readTheme() {
  if (typeof localStorage === 'undefined') return ThemeMode.Light
  try {
    const value = localStorage.getItem(StorageKey.Theme)
    if (value === ThemeMode.Dark || value === ThemeMode.Light) return value
  } catch {
    // اگر storage بسته باشد تم پیش‌فرض کافی است
  }
  return ThemeMode.Light
}

export function writeTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(StorageKey.Theme, theme)
  } catch {
    // نادیده بگیر
  }
}
