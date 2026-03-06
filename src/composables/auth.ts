import { ref } from 'vue'

export type AuthUser = {
  id: number
  name: string
  email: string
}

const STORAGE_KEY = 'authUser'
const currentUser = ref<AuthUser | null>(readStoredUser())

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function useAuth() {
  function setUser(user: AuthUser) {
    currentUser.value = user
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function refreshFromStorage() {
    currentUser.value = readStoredUser()
  }

  return {
    currentUser,
    setUser,
    logout,
    refreshFromStorage
  }
}