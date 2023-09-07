<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

export type links = { name: string; to: string }

const primaryLinks: links[] = [
  {
    name: 'Catálogo de juegos',
    to: '/games',
  },
  {
    name: 'Catálogo de desarrolladores',
    to: '/developers',
  },
  {
    name: 'Catálogo de equipos',
    to: '/teams',
  },
]
const secondaryLinks: links[] = [
  {
    name: 'Hechos interesantes',
    to: 'interesting_facts',
  },
]

const route = useRoute()

const isHome = computed(
  () => route.name === 'index' && route.fullPath === '/'
)

const isMenuOpen = ref(false)

const breakpoint = 768
const prevState = reactive({
  isMobile: false,
})

const handleResize = () => {
  const windowWidth = window.innerWidth

  if (
    (prevState.isMobile && windowWidth > breakpoint) ||
    (!prevState.isMobile && windowWidth <= breakpoint)
  ) {
    isMenuOpen.value = false
  }

  prevState.isMobile = windowWidth <= breakpoint
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="py-6">
    <div class="flex place-content-between items-end default_layout py-2">
      <div class="flex basis-2/3 sm:basis-1/3 h-32 xl:h-48 z-10">
        <NuxtLink class="w-fit" to="/">
          <img class="h-full" src="/logo_full.png" alt="" />
        </NuxtLink>
      </div>

      <div
        @click="isMenuOpen = !isMenuOpen"
        :class="{'text-white' : isHome}"
        class="flex text-lg items-center gap-x-2 md:hidden relative z-10"
      >
        <span>Menú</span>
        <div class="block w-5 relative transform">
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{
              'rotate-45': isMenuOpen,
              ' -translate-y-1.5': !isMenuOpen,
            }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{
              '-rotate-45': isMenuOpen,
              ' translate-y-1.5': !isMenuOpen,
            }"
          ></span>
        </div>
      </div>

      <div
        :class="{ '!translate-y-0 right-0 bg-white': isMenuOpen }"
        class="-translate-y-[500%] md:translate-y-0 absolute top-48 right-0 left-0 md:static flex flex-col flex-1 transition delay-75 z-20"
      >
        <ul
          class="md:flex flex-row place-content-end gap-x-4 text-white uppercase items-center mb-1 hidden"
        >
          <li v-for="link in secondaryLinks">
            <NuxtLink
              :to="link.to"
              :class="{
                'hover:!text-cyan-400 !text-white':
                  isHome && !isMenuOpen,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black text-sm xl:text-base"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
          <li class="hidden md:block">
            <FormKit
              type="search"
              inner-class="bg-white"
              placeholder="BUSCAR"
              input-class="text-black px-3 xl:py-2 !py-0"
            >
              <template #suffixIcon>
                <!-- <div class="bg-red-500 px-8 py-6"> -->
                <div class="bg-red-500 px-4 py-1">
                  <FormKitIcon
                    class="flex w-5 h-5 xl:w-8 xl:h-8"
                    icon="search"
                  />
                </div>
                <!-- </div> -->
              </template>
            </FormKit>
          </li>
        </ul>
        <ul
          class="flex flex-col md:flex-row text-white uppercase xl:text-xl font-semibold gap-x-2 xl:gap-x-12 place-content-end"
        >
          <li
            :class="{
              'flex w-full place-content-center items-center py-6 border-y':
                prevState.isMobile,
            }"
            v-for="link in prevState.isMobile
              ? primaryLinks.concat(secondaryLinks)
              : primaryLinks"
          >
            <NuxtLink
              :to="link.to"
              :class="{
                'hover:!text-cyan-400 !text-white':
                  isHome && !isMenuOpen,
              }"
              class="transition cursor-pointer hover:text-indigo-800 text-black"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <hr v-if="!isHome" class="w-full shadow-sm" />
</template>

<style scoped>
.open-enter-active,
.open-leave-active {
  transition: all 0.5s ease-out;
}

.open-enter-from,
.open-leave-to {
  @apply translate-y-full;
}

.close-enter-active,
.close-leave-active {
  transition: all 0.5s ease-out;
}

.close-enter-from,
.close-leave-to {
  @apply -translate-y-full;
}
</style>
