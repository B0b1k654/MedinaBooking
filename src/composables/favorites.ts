import { computed, ref } from 'vue'
import type { AuthUser } from './auth'
import { apiUrl } from '@/utils/api'

const favoriteListingIds = ref<string[]>([])
const errorMessage = ref('')
const isBusy = ref(false)

const favoriteIdsSet = computed(() => new Set(favoriteListingIds.value))

async function parseResponse(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text()

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return {}
  }
}

function sanitizeListingIds(source: unknown): string[] {
  if (!Array.isArray(source)) {
    return []
  }

  return source.filter((id): id is string => typeof id === 'string' && /^\d+-\d+$/.test(id))
}

export function useFavorites() {
  async function loadFavorites(user: AuthUser | null) {
    errorMessage.value = ''

    if (!user) {
      favoriteListingIds.value = []
      return
    }

    try {
      const response = await fetch(apiUrl('/api/favorites'), {
        headers: {
          'x-user-id': String(user.id)
        }
      })

      const data = await parseResponse(response)

      if (!response.ok) {
        const message = typeof data.message === 'string' ? data.message : 'Не удалось загрузить избранное.'
        throw new Error(message)
      }

      favoriteListingIds.value = sanitizeListingIds(data.favoriteListingIds)
    } catch (error) {
      favoriteListingIds.value = []

      if (error instanceof TypeError) {
        errorMessage.value = 'Не удалось подключиться к API избранного. Запустите backend (`npm run dev` или `npm run dev:server`).'
      } else {
        errorMessage.value = error instanceof Error ? error.message : 'Не удалось загрузить избранное.'
      }
    }
  }

  async function toggleFavorite(user: AuthUser | null, listingId: string) {
    errorMessage.value = ''

    if (!user) {
      throw new Error('Добавлять в избранное могут только авторизованные пользователи.')
    }

    isBusy.value = true

    try {
      const isFavorite = favoriteIdsSet.value.has(listingId)
      const method = isFavorite ? 'DELETE' : 'POST'

      const response = await fetch(apiUrl('/api/favorites'), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': String(user.id)
        },
        body: JSON.stringify({ listingId })
      })

      const data = await parseResponse(response)

      if (!response.ok) {
        const message = typeof data.message === 'string' ? data.message : 'Не удалось обновить избранное.'
        throw new Error(message)
      }

      favoriteListingIds.value = sanitizeListingIds(data.favoriteListingIds)
    } catch (error) {
      if (error instanceof TypeError) {
        errorMessage.value = 'Не удалось подключиться к API избранного. Запустите backend (`npm run dev` или `npm run dev:server`).'
      } else {
        errorMessage.value = error instanceof Error ? error.message : 'Не удалось обновить избранное.'
      }

      throw error
    } finally {
      isBusy.value = false
    }
  }

  return {
    favoriteIdsSet,
    errorMessage,
    isBusy,
    loadFavorites,
    toggleFavorite
  }
}