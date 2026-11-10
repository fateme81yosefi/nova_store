import { ThemeMode } from '@/types/enums/theme'

export const lightTheme = {
  mode: ThemeMode.Light,
  bg: '#F4F7FB',
  surface: '#FFFFFF',
  text: '#1A2744',
  muted: '#8A94A6',
  border: '#E6EBF3',
  accent: '#FF7A1A',
  accentHover: '#F0680C',
  onAccent: '#FFFFFF',
  header: '#101C33',
  headerText: '#F7F8FB',
  soft: '#F3F6FB',
  shadow: '0 10px 30px rgba(26, 39, 68, 0.06)',
}

export type AppTheme = typeof lightTheme

export const darkTheme: AppTheme = {
  mode: ThemeMode.Dark,
  bg: '#0C1422',
  surface: '#162033',
  text: '#F4F7FB',
  muted: '#A9B6C9',
  border: '#2C3E5C',
  accent: '#FF7A2F',
  accentHover: '#E86A22',
  onAccent: '#1B120C',
  header: '#090F1A',
  headerText: '#F7F8FB',
  soft: '#1C2940',
  shadow: '0 10px 30px rgba(0, 0, 0, 0.28)',
}
