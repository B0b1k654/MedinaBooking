export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL

  if (typeof raw !== 'string') {
    return ''
  }

  return raw.trim()
}

export function apiUrl(path: string): string {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (!baseUrl) {
    return normalizedPath
  }

  return `${baseUrl}${normalizedPath}`
}