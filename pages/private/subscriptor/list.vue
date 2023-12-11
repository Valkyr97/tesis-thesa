<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { FormKitIcon } from '@formkit/vue'

//State
const uiStore = useUiStore()
const { fetchSubscriptors, deleteSubscriptor } = useSubscriptor()

const { data: subscriptor, refresh } = await fetchSubscriptors()

const { warningToast } = useWarningToast()

const toast = useToast()

const keys: any = ['Subscriptor']

const path = '/private/subscriptor/form'

const data = computed(
  () =>
    subscriptor.value?.map((c) => ({ id: c.id, Subscriptor: c.email })) || []
)

const handleDelete = async (id: any) => {
  const name = subscriptor.value?.find((c) => c.id === id)?.email

  warningToast('eliminar', {
    text: 'la categoría' + ' ' + name,
    onConfirm: async () => {
      await deleteSubscriptor(id)
      await refresh()
    },
  })
}

const handleSend = async (id: number) => {
  uiStore.sending.add(id)

  const { error, status } = await useFetch(`/api/subscriptor/send/${id}`)

  uiStore.sending.delete(id)

  if (!error.value && status.value === 'success') {
    toast.success('Encuestas enviadas satisfactoriamente')
  } else if (error.value || status.value === 'error') {
    toast.error(
      'Lo sentimos ha ocurrido un error, verifique su conexión a internet'
    )
  }
}
</script>

<template>
  <div class="relative shadow-md sm:rounded-lg">
    <table class="w-full overflow-x-auto text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 relative">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="key in keys">
            {{ key }}
          </th>
          <th class="w-4"></th>
          <th class="w-4"></th>
        </tr>
        <button
          @click="() => $router.push(path)"
          class="absolute right-2 top-0 text-2xl font-bold text-center hover:text-green-600"
        >
          +
        </button>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b overflow-auto cursor-auto select-none relative"
          :class="{
            'opacity-40 pointer-events-none': uiStore.sending.has(row.id),
          }"
          v-for="row in data"
        >
          <td class="w-full flex px-6 py-4">
            <div class="flex place-content-between w-full">
              {{ row.Subscriptor }}
            </div>
          </td>
          <div class="absolute right-3 top-0 h-full flex gap-x-2">
            <button
              @click="handleSend(row.id)"
              type="button"
              class="text-center"
            >
              <UiTooltip class="z-20" text="enviar encuestas">
                <FormKitIcon
                  icon="email"
                  class="flex h-[1.12rem] hover:scale-110 transition"
                />
              </UiTooltip>
            </button>
            <button
              @click="handleDelete(row.id)"
              type="button"
              class="text-center"
            >
              <UiTooltip class="z-20" text="eliminar">
                <FormKitIcon
                  icon="trash"
                  class="flex h-[1.12rem] hover:scale-110 transition text-red-950"
                />
              </UiTooltip>
            </button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
