import { useToast } from 'vue-toastification'

export default () => {
  const toast = useToast()
  const isLoading = useLoading()

  const signIn = (email: string, password: string) => {
    const response = useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
    })

    if (response.error.value || response.status.value === 'error') {
      if (response.error.value?.status === 401) {
        toast.error('Correo o contraseña incorrectos')
      } else {
        toast.error('Lo sentimos ha ocurrido un error')
      }
      console.log(response.error.value)
    }

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  const signUp = (email: string, password: string) => {
    const response = useFetch('/api/auth/register', {
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

    isLoading.value =
      response.status.value === 'idle' || response.status.value === 'pending'

    return response
  }

  return {
    signIn,
    signUp,
  }
}
