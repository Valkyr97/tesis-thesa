<script setup lang="ts">
import useEvents from '~/composables/api/useEvents'

const { warningToast } = useWarningToast()

const { deleteEvent, fetchEvents } = useEvents()

const { data: events, refresh } = await fetchEvents()

const keys = ['Evento', 'Fecha']

const path = '/private/event/form'

const data = computed(
  () =>
    events.value?.map((c) => ({
      id: c.id,
      Evento: c.name,
      Fecha: c.date,
    })) || []
)

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'el evento: ' + events.value?.find((h) => h.id === id)?.name,
    onConfirm: async () => {
      await deleteEvent(id)
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
