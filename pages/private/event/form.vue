<script setup lang="ts">
import { HeadlineType } from '~/enums'

const route = useRoute()

const { id } = route.query

const { submit, actualData } = useSubmit('/api/headline', id)
</script>

<template>
  <FormKit type="form" @submit="submit">
    <div class="flex xl:flex-row flex-col flex-wrap gap-x-8">
      <div class="flex-1">
        <FormContent />
      </div>
      <div class="flex-1">
        <FormKit
          v-model="actualData"
          label="Link externo al evento"
          type="text"
          name="link"
        />
        <FormKit required label="Fecha del evento" type="date" name="date" />
        <FormKit type="meta" name="type" :value="HeadlineType.EVENT" />
      </div>
    </div>
  </FormKit>
</template>
~/enums/enums