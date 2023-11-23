<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification'

const useSubscriptorStore = useSubscriptor()
const toast = useToast()

const handleSubscribe = async (email?: string) => {
  if (!email) return

  const { error, status } = await useSubscriptorStore.create(email)

  if (error.value || status.value === 'error') {
    console.log(error.value)
  } else if (status.value === 'success') {
    toast.success(
      'Su subscripción ha sido completada exitosamente. Agradecemos su tiempo y su ayuda',
      {
        position: POSITION.TOP_CENTER,
        timeout: 4000,
      }
    )
  }

  console.log(email)
}
</script>

<template>
  <div class="bg-blue-800 text-white min-h-[50vh] py-24 relative">
    <div class="w-5/6 mx-auto">
      <h1 class="text-6xl font-semibold w-full pb-20 text-center">
        Ponte en Contacto
      </h1>
      <div
        class="xl:flex flex-col md:grid md:grid-cols-2 gap-y-12 lg:flex-row w-full gap-x-24 place-content-between"
      >
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">Dirección</h5>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
            blanditiis, impedit amet inventore deleniti hic provident quas,
            praesentium debitis et laborum aliquam dolorum!
          </p>
        </div>
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">Inscríbete</h5>
          <FormKit
            wrapper-class=""
            inner-class="bg-white"
            input-class="text-black p-3"
            type="email"
            placeholder="Pon tu correo"
          >
            <template #suffixIcon="context">
              <button
                @click="handleSubscribe(context.value)"
                class="border tracking-tight md:text-lg bg-red-600 px-2 lg:px-8 2xl:px-12 py-2 h-full uppercase font-bold hover:opacity-95 active:opacity-90"
              >
                Enviar
              </button>
            </template>
          </FormKit>
        </div>
        <div class="flex flex-col flex-1">
          <h5 class="uppercase font-semibold text-xl pb-4">
            Mantente al tanto
          </h5>
        </div>
      </div>
    </div>
    <NuxtLink
      to="/private"
      class="absolute bottom-2 left-2 text-gray-400 hover:text-cyan-400 cursor-pointer select-none"
    >
      Ir a la sección de editor
    </NuxtLink>
  </div>
</template>

<style scoped></style>
