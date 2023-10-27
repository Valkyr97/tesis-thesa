<script setup lang="ts">
import type { IDev } from '../../types/IDevelopers'
import { FormKitIcon } from '@formkit/vue'

const props = defineProps<{
  avatar: string
  title: string
  subtitle: string
  skills?: { tool: string }[]
  address?: string
  phone?: string
  email?: string
  socialMedias?: { name: string }[]
}>()
</script>

<template>
  <div
    class="flex flex-col py-2 px-4 border w-full select-none hover:shadow-md transition"
  >
    <div class="flex gap-3 items-start pb-2 border-b">
      <img
        @error="e => (e.target as HTMLImageElement).src = '/avatar.png'"
        :src="avatar"
        class="rounded h-16 w-16 object-contain"
        alt=""
      />
      <div class="flex flex-col">
        <h2 class="text-xl font-medium">{{ title }}</h2>
        <h3 class="capitalize text-gray-400 text-sm -mt-1.5 mb-1">
          {{ subtitle }}
        </h3>
        <div class="flex gap-x-3 flex-wrap h-fit gap-y-1">
          <div
            v-for="skill in skills"
            class="flex flex-col items-center relative w-fit place-content-between bg-cyan-50/60 backdrop-blur-sm"
          >
            <span
              class="self-start text-xs font-semibold px-1 rounded-sm whitespace-nowrap text-cyan-800 select-none"
            >
              {{ skill.tool }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-2 px-2 gap-2">
      <UiTooltip v-if="address" :text="address">
        <div
          class="border border-current h-7 w-7 flex place-content-center items-center p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              d="M12 0C7.52 0 4 3.58 4 8c0 5.25 7.38 15.92 7.76 16.53a1 1 0 0 0 1.48 0C12.62 23.92 20 13.25 20 8c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            />
          </svg>
        </div>
      </UiTooltip>
      <UiTooltip v-if="phone" :text="phone">
        <FormKitIcon
          icon="telephone"
          class="flex h-7 border border-current p-1 rounded-full"
        />
      </UiTooltip>
      <UiTooltip v-if="email" :text="email">
        <FormKitIcon
          icon="email"
          class="flex h-7 border border-current p-1 rounded-full"
        />
      </UiTooltip>

      <template v-if="socialMedias">
        <div v-for="socialMedia in socialMedias" class="flex">
          <span>{{ socialMedia.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.arrow::before {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
</style>
