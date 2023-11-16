<script setup lang="ts">
definePageMeta({
  middleware: 'oauth2',
  name: 'survey_list',
})

const { warningToast } = useWarningToast()

const keys = ['Encuesta']

const router = useRouter()

const path = '/private/survey/form'

const { fetchSurveysFromDb, deleteSurvey } = useSurvey()

const { data: surveys, refresh } = await fetchSurveysFromDb()

const data = computed(
  () =>
    surveys.value?.map((s) => ({
      id: s.id,
      Encuesta: s.title,
    })) || []
)

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'la encuesta: ' + surveys.value?.find((s) => s.id === id)?.title,
    onConfirm: async () => {
      await deleteSurvey(id)
      await refresh()
    },
  })
}

const handleRouteChangeToUpdate = (id: number) => {
  localStorage.setItem('formToUpdateId', JSON.stringify(id))
  router.push(path)
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
        iconColor: 'green-950',
        onAction: (id) => handleRouteChangeToUpdate(id),
      },
      {
        name: 'delete',
        icon: 'trash',
        iconColor: 'red-950',
        onAction: handleDelete,
      },
    ]"
  />
</template>
