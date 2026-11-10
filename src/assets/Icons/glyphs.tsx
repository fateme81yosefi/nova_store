type GlyphProps = {
  size?: number
}

export function BagIcon({ size = 30 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#FF7A1A" d="M7.5 11.2h17l-1.45 14.1a2 2 0 0 1-2 1.8H10.95a2 2 0 0 1-2-1.8L7.5 11.2z" />
      <path d="M12.2 11.2V9.1a3.8 3.8 0 0 1 7.6 0v2.1" fill="none" stroke="#FF7A1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CartIcon({ size = 22 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 4.5h2.1l1.9 10.6a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.3L21 8H6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19.5" r="1.35" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.35" fill="currentColor" />
    </svg>
  )
}

export function SearchIcon({ size = 16 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 16.2 20 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function GlobeIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 4c2.1 2.3 3.2 5 3.2 8s-1.1 5.7-3.2 8c-2.1-2.3-3.2-5-3.2-8s1.1-5.7 3.2-8z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function MoonIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16.7 3.5A8.1 8.1 0 1 0 20.7 16 6.5 6.5 0 0 1 16.7 3.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export function SunIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function MenuIcon({ size = 22 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ size = 16 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5.5v13M5.5 12h13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function ShirtIcon({ size = 26 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.2 6.4 5.4 8.1 3.6 11.2l2.9 1.3.9-1.2V19h9.2v-7.7l.9 1.2 2.9-1.3-1.8-3.1-2.8-1.7c-.5 1.5-2 2.4-4 2.4s-3.5-.9-4-2.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LaptopIcon({ size = 26 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4.2" width="14" height="10.2" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.4 17.2h17.2L19.2 19.6H4.8L3.4 17.2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function GridIcon({ size = 26 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.4" height="6.4" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.6" y="4" width="6.4" height="6.4" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.6" width="6.4" height="6.4" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.6" y="13.6" width="6.4" height="6.4" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function HomeIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10.6 12 4l8 6.6V20a1 1 0 0 1-1 1h-5.1v-6.1H10.1V21H5a1 1 0 0 1-1-1v-9.4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function DiamondIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.2 9.2 7 4h10l3.8 5.2L12 20.4 3.2 9.2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3.2 9.2h17.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function TrashIcon({ size = 18 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 7.2h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.2 7.1V5.4h5.6v1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.4 7.2l.8 12.1h7.6l.8-12.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
