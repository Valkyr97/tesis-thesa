<script setup lang="ts">
import { Developer } from '~/server/entities/developer'

// State
const developers = ref<Partial<Developer>[]>()

const { warningToast } = useWarningToast()

const keys = ['Nombre', 'Rol', 'Email', 'Equipo']

const path = '/private/developer/form'

// Getters
const data = computed(
  () =>
    developers.value?.map((d) => ({
      id: d.id,
      Nombre: d.name,
      Rol: d.role,
      Email: d.email,
      Equipo: d.team?.name,
    })) || []
)

//Actions
const fetchDevelopers = async () => {
  developers.value = await $fetch('/api/developer', { query: { team: true } })
}

const handleDelete = (id: any) => {
  const name = developers.value?.find((d) => d.id === id)?.name

  warningToast('eliminar', {
    text: 'el Desarrollador: ' + name,
    onConfirm: async () => {
      await $fetch(`/api/developer/${id}`, { method: 'DELETE' })
      await fetchDevelopers()
    },
  })
}

onMounted(() => {
  fetchDevelopers()
})
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
