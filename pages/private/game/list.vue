<script setup lang="ts">


const { warningToast } = useWarningToast()

const { deleteGame, fetchGames } = useGames()

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
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :actions="[
      {
        name: 'edit',
        icon: 'tools',
        iconColor: 'green',
        onAction: (id) => $router.push({ path, query: id }),
      },
      {
        name: 'delete',
        icon: 'trash',
        iconColor: 'red',
        onAction: handleDelete,
      },
    ]"
  />
</template>
~/stores/api/useGames