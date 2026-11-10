import type { ReactNode } from 'react'
import '@/assets/Fonts/vazirmatn.css'
import '@/app/globals.css'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
