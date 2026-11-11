import { safeImageUrl } from '@/security/url'

export function SafeImage({ src, alt }: { src: string; alt: string }) {
  const safe = safeImageUrl(src)
  if (!safe) return null
  return <img src={safe} alt={alt} />
}
