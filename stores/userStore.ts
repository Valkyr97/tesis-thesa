import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = useStorage('isAuthenticated', false)
  const token = useStorage('token', '')

  const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value
  }

  const setToken = (value: string) => {
    token.value = value
  }

  return {
    isAuthenticated,
    token,
    setIsAuthenticated,
    setToken,
  }
})
