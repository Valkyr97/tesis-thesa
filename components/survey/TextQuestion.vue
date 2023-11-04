<script setup lang="ts">
defineProps(['isParagraph'])
</script>

<template>
  <FormKit
    type="text"
    :placeholder="
      isParagraph ? 'Texto de respuesta largo' : 'Texto de respuesta corto'
    "
    disabled
    outer-class="max-w-md"
    inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
    input-class="$remove:border-none border-b border-dashed $remove:py-2 !px-2"
    :ignore="true"
  />
</template>
