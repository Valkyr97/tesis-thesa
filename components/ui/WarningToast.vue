<script setup lang="ts">
const props = defineProps<{
  elementToDelete: string
  textToConfirm: string
  onConfirm: () => void
}>()

const emit = defineEmits(['close-toast'])

const handleConfirm = async () => {
  await props.onConfirm()
  emit('close-toast')
}
</script>

<template>
  <div>
    <p class="text-cool-gray-700 font-medium select-none">
      Seguro que desea eliminar {{ elementToDelete }}
    </p>
    <div class="flex w-full place-content-around mt-2">
      <button
        @click="$emit('close-toast')"
        type="button"
        class="border border-3 font-semibold py-0.5 px-3 rounded-sm border-current transition custom-shadow"
      >
        Cancelar
      </button>
      <button
        type="button"
        @click="handleConfirm"
        class="border border-3 font-semibold py-0.5 px-3 rounded-sm border-current custom-shadow transition"
      >
        {{ textToConfirm }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-shadow:hover {
  box-shadow: -0px 0px 5px 1.5px rgba(255, 255, 255, 0.8);
}
</style>
