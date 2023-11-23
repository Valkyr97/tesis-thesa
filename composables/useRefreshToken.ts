import useAuth from '~/stores/api/useAuth'

export default function () {
  const { refreshToken } = useAuth()

  onMounted(async () => {
    await refreshToken()

    setInterval(
      async () => {
        await refreshToken()
      },
      1 * 60 * 60 * 1000 // 1 Hora en milisegundos
    )
  })
}
