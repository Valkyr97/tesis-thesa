<script setup lang="ts">
import { Team } from '~/server/entities/team'

const { warningToast } = useWarningToast()

const teams = ref<Team[]>()

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

const fetchTeams = async () => {
  teams.value = await $fetch('/api/team', { query: { categories: true } })
}

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'el equipo: ' + teams.value?.find((t) => t.id === id)?.name,
    onConfirm: async () => {
      await $fetch(`/api/team/${id}`, { method: 'DELETE' })
      await fetchTeams()
    },
  })
}
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
