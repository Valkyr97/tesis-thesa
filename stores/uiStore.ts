import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)

  const setIsLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return {
    isLoading,
    setIsLoading,
  }
})