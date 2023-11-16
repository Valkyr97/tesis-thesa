import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, token } = useUserStore()

  if ((!isAuthenticated || !token) && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }
})
