<script setup lang="ts">
const { signIn } = useAuth()
const { setIsAuthenticated, setToken } = useUserStore()
const router = useRouter()

const handleSubmit = async (values: any) => {
  const { status, error, data } = await signIn(values.email, values.password)

  if (status.value === 'success' && data.value?.token) {
    setIsAuthenticated(true)
    setToken(data.value.token)
    router.push('/private')
  } else {
    console.log(error.value)
    return
  }
}
</script>

<template>
  <div
    class="bg-door bg-center bg-no-repeat bg-cover min-h-screen flex items-center justify-center"
  >
    <div class="max-w-md p-2 h-fit rounded self-center flex-grow">
      <FormKit @submit="handleSubmit" type="form">
        <FormKit
          inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
          input-class="$remove:border-none border-b $remove:py-2 !px-2 placeholder:text-white"
          name="email"
          placeholder="Correo Electrónico"
          type="email"
        />
        <FormKit
          inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
          input-class="$remove:border-none border-b $remove:py-2 !px-2 placeholder:text-white"
          name="password"
          placeholder="Contraseña"
          type="password"
        />
      </FormKit>
    </div>
  </div>
</template>
~/stores/api/useAuth
