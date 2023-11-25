<script setup lang="ts">
const { warningToast } = useWarningToast()

const { deleteTeam, fetchTeams } = useTeams()

const { data: teams, refresh } = await fetchTeams()

const keys = ['Nombre', 'Descripción']

const path = '/private/team/form'

const data = computed(
  () =>
    teams.value?.map((t) => ({
      id: t.id,
      Nombre: t.name,
      Descripción: t.description,
    })) || []
)

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'el equipo: ' + teams.value?.find((t) => t.id === id)?.name,
    onConfirm: async () => {
      await deleteTeam(id)
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
        onAction: (id) => $router.push({ path, query: { id } }),
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
~/stores/api/useTeams
