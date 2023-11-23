<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

defineProps<{
  keys: string[]
  tableRowsData: any[]
  onEditClick?: (id: any) => void
  onPlusClick?: () => void
  actions?: {
    name?: string
    icon: string
    iconColor?: 'green' | 'blue' | 'red'
    onAction?: (param?: any) => void
  }[]
}>()

defineEmits<{
  (e: 'delete', id: any): void
}>()

const colorVariants = {
  green: 'text-green-950',
  red: 'text-red-950',
  blue: 'text-blue-950',
}
</script>

<template>
  <div class="relative shadow-md sm:rounded-lg">
    <table class="w-full overflow-x-auto text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 relative">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="key in keys">
            {{ key }}
          </th>
          <th v-for="_ in actions" class="w-4"></th>
        </tr>
        <button
          @click="onPlusClick"
          class="absolute right-2 top-0 text-2xl font-bold text-center hover:text-green-600"
        >
          +
        </button>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b overflow-auto cursor-auto select-none relative group"
          v-for="row in tableRowsData"
        >
          <td v-for="key in keys" class="px-6 py-4">
            <template v-if="Array.isArray(row[key])">
              <div class="flex flex-col">
                <td v-for="el in row[key]">
                  {{ el }}
                </td>
              </div>
            </template>
            <template v-else>
              <td class="w-full flex">
                <div class="flex place-content-between w-full">
                  {{ row[key] }}
                </div>
              </td>
            </template>
          </td>
          <div class="absolute right-3 top-0 h-full flex gap-x-2">
            <template v-for="action in actions">
              <button
                @click="action.onAction ? action.onAction(row.id) : {}"
                type="button"
                class="text-center"
              >
                <FormKitIcon
                  :icon="action.icon"
                  :class="action.iconColor && colorVariants[action.iconColor]"
                  class="flex h-[1.12rem] hover:scale-110 transition"
                />
              </button>
            </template>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
