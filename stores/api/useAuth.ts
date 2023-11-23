import { useToast } from 'vue-toastification'

export default defineStore('api/auth', () => {
  const toast = useToast()
  const uiStore = useUiStore()
  const userStore = useUserStore()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    const response = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
    })

    console.log(response)

    if (response.error.value || response.status.value === 'error') {
      if (response.error.value?.statusCode === 401) {
        toast.error('Correo o contraseña incorrectos')
        console.log(response.error.value)
      } else {
        console.log(response.error.value)
        toast.error('Lo sentimos ha ocurrido un error')
      }
    } else if (
      response.status.value === 'success' &&
      response.data.value?.token
    ) {
      userStore.setToken(response.data.value?.token)
      userStore.isAuthenticated = true
    }

    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    return response
  }

  const signUp = async (email: string, password: string) => {
    const response = await useFetch('/api/auth/register', {
      method: 'POST',
      body: {
        email,
        password,
      },
    })
    if (response.error.value || response.status.value === 'error') {
      toast.error('Lo sentimos ha ocurrido un error')
      console.log(response.error.value)
    }

    watch(
      () => response.status,
      (status) => {
        uiStore.setIsLoading(
          status.value === 'idle' || status.value === 'pending'
        )
      }
    )

    return response
  }

  const refreshToken = async () => {
    const response = await useFetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        'x-authorization-token': `Bearer ${userStore.token}`,
      },
    })
    if (response.error.value || response.status.value === 'error') {
      if (response.error.value?.statusCode === 401) {
        router.push('/auth/login')
        console.log(response.error.value)
      } else {
        router.push('/auth/login')
        console.log(response.error.value)
      }
    } else if (
      response.status.value === 'success' &&
      response.data.value?.token
    ) {
      userStore.setToken(response.data.value?.token)
      userStore.isAuthenticated = true
    }

    return response
  }

  return {
    signIn,
    signUp,
    refreshToken,
  }
})
