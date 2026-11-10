import axios from 'axios'

function readBaseUrl() {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!value) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')
  }
  return value
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
      const data = error.response?.data
      if (typeof data === 'string' && data.trim()) return Promise.reject(new Error(data))
      return Promise.reject(new Error(error.message))
    }
    return Promise.reject(error)
  },
)
