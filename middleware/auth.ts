import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useUserStore()

  if (!isAuthenticated && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }
})
