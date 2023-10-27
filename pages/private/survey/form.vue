<script setup lang="ts">
import { saveSurvey } from '~/api'

definePageMeta({
  middleware: 'oauth2',
  name: 'survey_form',
})

const handleSubmit = async (values: any) => {
  const params = JSON.parse(localStorage.getItem('oauth2-params') || '')

  // trySampleRequest()
  const { error, status, data } = await useFetch(
    'https://forms.googleapis.com/v1/forms',
    {
      method: 'POST',
      body: {
        info: {
          title: values.title,
          document_title: values.title,
        },
      },
      headers: {
        Authorization: `Bearer ${params['access_token']}`,
      },
    }
  )

  if (!error.value && status.value === 'success' && data.value) {
    console.log(data)
    //@ts-ignore
    saveSurvey(data.value.formId, values.title)
  }
}
</script>

<template>
  <FormKit type="form" @submit="handleSubmit">
    <FormKit type="text" name="title" label="Título de la Encuesta" />
  </FormKit>
</template>
