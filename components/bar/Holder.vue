<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

defineProps<{
  isSelected: boolean
}>()
</script>

<template>
  <div
    class="h-5 flex bg-white w-full place-content-center items-center relative cursor-move"
  >
    <div
      :class="{ '!flex': isSelected }"
      class="flex-col group-hover:flex hidden transition duration-75"
    >
      <FormKitIcon
        icon="reorder"
        class="rotate-90 flex h-5 w-2 text-gray-700"
      />
      <FormKitIcon
        icon="reorder"
        class="rotate-90 flex h-5 w-2 -mt-3.5 text-gray-700"
      />
    </div>
  </div>
</template>
