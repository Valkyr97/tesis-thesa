<script setup lang="ts">
import {FormKitIcon} from '@formkit/vue'

defineProps<{
    keys:  string[]
    tableRowsData: any[]
    onRowClick?: (id: any) => void
    onPlusClick?: () => void
}>()

defineEmits<{
  (e: 'delete', id: any): void
}>()

</script>

<template>
  <div class="relative shadow-md sm:rounded-lg">
    <table class="w-full overflow-x-auto text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 relative">
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="key in keys"
          >
            {{ key }}
          </th>
        </tr>
        <button
        @click="onPlusClick"
        class="absolute right-2 top-0 text-2xl font-bold text-center hover:text-green-600">+</button>
      </thead>
      <tbody>
        <tr
        class="bg-white border-b hover:bg-gray-50 overflow-auto cursor-auto select-none relative"
        v-for="row in tableRowsData"
        @click="onRowClick? onRowClick(row.id) : {}"
        >
          <td
            v-for="key in keys"
            class="px-6 py-4"
          >
            <template v-if="Array.isArray(row[key])">
              <div class="flex flex-col">
                <td v-for="el in row[key]">
                    {{ el }}
                </td>
              </div>
            </template>
            <td class="w-full flex" v-else>
              <div class="flex place-content-between w-full">
                {{ row[key] }}
              </div>
            </td>
          </td>
          <button 
          @click.stop="$emit('delete', row.id)"
          type="button" class="absolute right-3 top-0 h-full text-center">
            <FormKitIcon icon="trash" class="flex h-4 text-red-900" />
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
