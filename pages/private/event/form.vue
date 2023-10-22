<script setup lang="ts">
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
  </FormKit>
</template>
