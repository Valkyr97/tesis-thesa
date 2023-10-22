<script setup lang="ts">
import { Game } from '~/server/entities/game'

const { warningToast } = useWarningToast()

const games = ref<Game[]>()

const keys = ['Nombre', 'Descripción', 'Categorías']

const path = '/private/game/form'

const data = computed(
  () =>
    games.value?.map((g) => ({
      id: g.id,
      Nombre: g.name,
      Descripción: g.description,
      Categorías: g.categories.map((c) => c.name).join(', '),
    })) || []
)

const fetchGames = async () => {
  games.value = await $fetch('/api/game', { query: { categories: true } })
}

const handleDelete = async (id: any) => {
  warningToast('eliminar', {
    text: 'el juego: ' + games.value?.find((g) => g.id === id)?.name,
    onConfirm: async () => {
      await $fetch(`/api/game/${id}`, { method: 'DELETE' })
      await fetchGames()
    },
  })
}

onMounted(() => fetchGames())
</script>

<template>
  <TemplatesDynamicTable
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :createRoute="path"
    :onRowClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
