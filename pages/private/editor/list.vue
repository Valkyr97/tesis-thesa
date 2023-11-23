<script setup lang="ts">
//State
const { fetchEditors, deleteEditor } = useEditor()

const { data: editors, refresh } = await fetchEditors()

const { warningToast } = useWarningToast()

const keys = ['Editor', 'Correo']

const path = '/private/editor/form'

const data = computed(
  () =>
    editors.value?.map((c) => ({
      id: c.id,
      Editor: c.name,
      Correo: c.email,
    })) || []
)

const handleDelete = async (id: any) => {
  const name = editors.value?.find((c) => c.id === id)?.name

  warningToast('eliminar', {
    text: 'el editor ' + name,
    onConfirm: async () => {
      await deleteEditor(id)
      await refresh()
    },
  })
}
</script>

<template>
  <TemplatesDynamicTable
    :keys="keys"
    :tableRowsData="data"
    :actions="[
      {
        name: 'delete',
        icon: 'trash',
        iconColor: 'red',
        onAction: handleDelete,
      },
    ]"
  />
</template>
~/stores/api/useEditor
