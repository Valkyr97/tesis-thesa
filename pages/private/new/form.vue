<script setup lang="ts">
import { HeadlineType } from '~/utils/enums'

const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/headline', id)
</script>

<template>
  <FormKit type="form" @submit="submit" v-model="actualData">
    <FormContent />
    <FormKit label="Link externo a la noticia" type="text" name="link" />
    <FormKit type="meta" name="type" :value="HeadlineType.NEW" />
  </FormKit>
</template>
