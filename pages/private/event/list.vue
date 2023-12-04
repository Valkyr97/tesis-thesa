<script setup lang="ts">
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
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :actions="[
      {
        name: 'editar',
        icon: 'tools',
        iconColor: 'green',
        onAction: (id) => $router.push({ path, query: { id } }),
      },
      {
        name: 'eliminar',
        icon: 'trash',
        iconColor: 'red',
        onAction: handleDelete,
      },
    ]"
  />
</template>
