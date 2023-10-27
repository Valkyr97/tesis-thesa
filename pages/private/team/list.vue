<script setup lang="ts">
import { deleteTeam, fetchTeams } from '~/api'

const { warningToast } = useWarningToast()

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
    @delete="handleDelete"
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :onRowClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
