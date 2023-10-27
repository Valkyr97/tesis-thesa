<script setup lang="ts">
const props = defineProps<{
  elements?: { name: string; id: any }[]
  initialList?: any[]
}>()

const emit = defineEmits<{
  (e: 'filter-updated', elements: Set<any>): void
}>()

const selectedElements = ref(new Set(props.initialList))

const handleClick = (id: any) => {
  selectedElements.value.has(id)
    ? selectedElements.value.delete(id)
    : selectedElements.value.add(id)

  emit('filter-updated', selectedElements.value)
}
</script>

<template>
  <div
    class="flex gap-x-4 place-content-around border-y py-3 px-1 sticky top-0.5 z-10 bg-white flex-wrap overflow-hidden"
  >
    <span
      v-for="element in elements"
      class="text-indigo-900 capitalize font-semibold text-lg cursor-pointer w-fit hover:text-cyan-500 active:!text-cyan-300 transition"
      :class="{
        '!text-cyan-500': selectedElements.has(element.id),
      }"
      @click="handleClick(element.id)"
      >{{ element.name }}</span
    >
  </div>
</template>
