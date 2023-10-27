<script setup lang="ts">
import { deleteGame, fetchGames } from '~/api'

const { warningToast } = useWarningToast()

const { data: games, refresh } = await fetchGames()

const keys = ['Nombre', 'Géneros']

const path = '/private/game/form'

const data = computed(
  () =>
    games.value?.map((g) => ({
      id: g.id,
      Nombre: g.name,
      Géneros: g.categories?.map((c) => c.name).join(', '),
    })) || []
)

const handleDelete = async (id: any) => {
  warningToast('eliminar', {
    text: 'el juego: ' + games.value?.find((g) => g.id === id)?.name,
    onConfirm: async () => {
      await deleteGame(id)
      await refresh()
    },
  })
}
</script>

<template>
  <TemplatesDynamicTable
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :onRowClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
