<script setup lang="ts">
import { HeadlineType } from '~/utils/enums'

const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/headline', id)
</script>

<template>
  <FormKit type="form" @submit="submit">
    <FormContent />
    <FormKit
      v-model="actualData"
      label="Link externo al evento"
      type="text"
      name="link"
    />
    <FormKit required label="Fecha del evento" type="date" name="date" />
    <FormKit type="meta" name="type" :value="HeadlineType.EVENT" />
  </FormKit>
</template>
