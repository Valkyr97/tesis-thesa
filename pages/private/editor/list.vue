<script setup lang="ts">
import useDevelopers from '~/composables/api/useDevelopers'

// State
const { fetchDevelopers, deleteDeveloper } = useDevelopers()

const { data: developers, refresh } = await fetchDevelopers({ team: true })

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
const handleDelete = (id: any) => {
  const name = developers.value?.find((d) => d.id === id)?.name

  warningToast('eliminar', {
    text: 'el Desarrollador: ' + name,
    onConfirm: async () => {
      await deleteDeveloper(id)
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
    :onEditClick="(id: any) => $router.push({ path, query: {id}})"
  />
</template>
