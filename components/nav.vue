<script setup lang="ts">
const props = defineProps<{
  transparent?: boolean;
}>();

// State
const isMenuOpen = ref(false);

const breakpoint = 768;
const prevState = reactive({
  isMobile: false,
});

// Getters
const transparentModel = computed(
  () => props.transparent || prevState.isMobile
);

// Actions
const handleResize = () => {
  const windowWidth = window.innerWidth;

  if (
    (prevState.isMobile && windowWidth > breakpoint) ||
    (!prevState.isMobile && windowWidth <= breakpoint)
  ) {
    isMenuOpen.value = false;
  }

  prevState.isMobile = windowWidth <= breakpoint;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="absolute top-0 right-0 left-0 z-20">
    <div class="h-3 bg-gradient-to-r from-blue-900 to-red-500" />
    <div
      :class="{ 'bg-white shadow-lg': !transparent || prevState.isMobile }"
      class="py-1"
    >
      <div class="flex place-content-between items-end default_layout py-2">
        <div class="flex basis-2/3 sm:basis-1/3 h-16 md:h-28 xl:h-36">
          <NuxtLink class="w-fit" to="/">
            <img class="h-full" src="/logo_full.png" alt="" />
          </NuxtLink>
        </div>

        <div
          @click="isMenuOpen = !isMenuOpen"
          class="flex text-lg items-center gap-x-2 md:hidden relative z-20 text-black"
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

        <!-- Nav Component -->
        <div
          v-if="prevState.isMobile"
          :class="{ '!translate-y-0 right-0 bg-white': isMenuOpen }"
          class="-translate-y-[300%] absolute top-28 right-0 left-0 flex flex-col flex-1 transition duration-700 z-10"
        >
          <UiNavLinksList
            :is-menu-open="isMenuOpen"
            :is-mobile="prevState.isMobile"
            :transparent-model="transparentModel"
          />
        </div>

        <div v-else class="translate-y-0 flex flex-col flex-1 transition">
          <UiNavLinksList
            :is-menu-open="isMenuOpen"
            :is-mobile="prevState.isMobile"
            :transparent-model="transparentModel"
          />
        </div>
      </div>
    </div>
  </div>
  <hr v-if="!transparentModel" class="w-full shadow-sm" />
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
