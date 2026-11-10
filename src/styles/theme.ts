import { ThemeMode } from '@/types/enums/theme'

export const lightTheme = {
  mode: ThemeMode.Light,
  bg: '#F6F3EE',
  surface: '#FFFFFF',
  text: '#142033',
  muted: '#66758A',
  border: '#E6DFD4',
  accent: '#F26A1B',
  accentHover: '#DB560E',
  onAccent: '#FFFFFF',
  header: '#101C33',
  headerText: '#F7F8FB',
  soft: '#F3EEE7',
  shadow: '0 10px 30px rgba(16, 28, 51, 0.06)',
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
