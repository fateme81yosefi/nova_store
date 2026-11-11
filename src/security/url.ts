function readHttpUrl(value: string) {
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (url.username || url.password) return null
    return url
  } catch {
    return null
  }
}

export function safeImageUrl(value: string) {
  const url = readHttpUrl(value)
  if (!url || url.protocol !== 'https:') return null
  if (url.hostname !== 'fakestoreapi.com') return null
  return url.href
}

export function safeExternalUrl(value: string, hosts: readonly string[]) {
  const url = readHttpUrl(value)
  if (!url || url.protocol !== 'https:') return null
  if (!hosts.includes(url.hostname)) return null
  return url.href
}
