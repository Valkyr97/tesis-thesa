<script setup lang="ts">
const props = defineProps(['modelValue', 'isSelected', 'placeholder'])
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', field: 'title', value?: string): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <FormKit
    v-if="isSelected"
    type="text"
    name="title"
    :placeholder="placeholder"
    outer-class="flex-grow"
    inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
    input-class="$remove:border-none border-b $remove:py-2 !px-2 text-lg"
    :ignore="true"
    v-model="value"
    validation="required"
    @input.passive="(e) => emit('change', 'title', e)"
  />
  <span class="text-lg" v-else>{{ value || placeholder }}</span>
</template>
