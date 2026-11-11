import axios from 'axios'

function readBaseUrl() {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!value) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')
  }
  return value
}

type UnauthorizedHandler = () => void

let onUnauthorized: UnauthorizedHandler | null = null

export function setUnauthorizedHandler(handler: UnauthorizedHandler) {
  onUnauthorized = handler
}

export function notifyUnauthorized() {
  onUnauthorized?.()
}

export const api = axios.create({
  baseURL: readBaseUrl(),
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) notifyUnauthorized()
      const data = error.response?.data
      const message = typeof data === 'string' && data.trim() ? data : error.message
      const failure = new Error(message) as Error & { status?: number }
      failure.status = error.response?.status
      return Promise.reject(failure)
    }
    return Promise.reject(error)
  },
)
