<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'
import { useToast } from 'vue-toastification'

definePageMeta({
  // middleware: 'oauth2',
  name: 'survey_list',
})

const router = useRouter()

const { warningToast } = useWarningToast()

const { fetchSurveyList, deleteSurvey, fetchSurveyById } = useSurvey()

const { data: surveys, refresh, status } = await fetchSurveyList()

const linkBtnIcon = ref('link')
const uiStore = useUiStore()
const toast = useToast()

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

const handleLinkClick = async (id: string) => {
  linkBtnIcon.value = 'spinner'
  uiStore.isLoading = true

  const { data, error, status } = await fetchSurveyById(id)
  uiStore.isLoading = false
  linkBtnIcon.value = 'link'

  if (error.value || status.value == 'error') {
    toast.error('Ha ocurrido un error al intentar copiar el link')
    console.log(error.value)
    return
  }

  if (data.value.responderUri) {
    toast.success('Link copiado con éxito')
    navigator.clipboard.writeText(data.value.responderUri)
  }
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
        name: 'respuestas',
        icon: 'eye',
        iconColor: 'blue',
        onAction: (id) => $router.push(`/private/survey/${id}/responses`),
      },
      {
        name: 'copiar link',
        icon: linkBtnIcon,
        onAction: handleLinkClick,
      },
      {
        name: 'editar',
        icon: 'tools',
        iconColor: 'green',
        onAction: (id) => handleRouteChangeToUpdate(id),
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
