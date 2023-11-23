<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

definePageMeta({
  // middleware: 'oauth2',
  name: 'survey_list',
})

const router = useRouter()

const { warningToast } = useWarningToast()

const { fetchSurveyList, deleteSurvey } = useSurvey()

const { data: surveys, refresh, status } = await fetchSurveyList()

const uiStore = useUiStore()

const keys = ['Encuesta']

const path = '/private/survey/form'

const data = computed(
  () =>
    surveys.value?.map((s: any) => ({
      id: s.id,
      Encuesta: s.name,
    })) || []
)

const handleDelete = (id: any) => {
  warningToast('eliminar', {
    text: 'la encuesta: ' + surveys.value?.find((s: any) => s.id === id)?.title,
    onConfirm: async () => {
      uiStore.isLoading = true

      await deleteSurvey(id)

      await refresh()

      uiStore.isLoading = false
    },
  })
}

const handleRouteChangeToUpdate = async (id: number) => {
  localStorage.setItem('formToUpdateId', JSON.stringify(id))
  await router.push(path)
}
</script>

<template>
  <div class="flex" v-if="status === 'pending'">
    <FormKitIcon icon="spinner" class="h-6 animate-spin" />
  </div>
  <TemplatesDynamicTable
    :keys="keys"
    :tableRowsData="data"
    :onPlusClick="() => $router.push(path)"
    :actions="[
      {
        name: 'visualization',
        icon: 'eye',
        iconColor: 'blue',
        onAction: (id) => $router.push(`/private/survey/${id}/responses`),
      },
      {
        name: 'edit',
        icon: 'tools',
        iconColor: 'green',
        onAction: (id) => handleRouteChangeToUpdate(id),
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
