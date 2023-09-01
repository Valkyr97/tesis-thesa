<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue'

const showScrollButton = ref(false)

const handleScroll = () => {
  const scrollDistance =
    window.pageYOffset || document.documentElement.scrollTop
  showScrollButton.value = scrollDistance >= window.innerHeight
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition>
    <button
      class="fixed bottom-4 right-4 border p-2 bg-gray-800 text-white bg-opacity-40"
      type="button"
      v-if="showScrollButton"
      @click="scrollToTop"
    >
      <FormKitIcon icon="up" class="flex w-8 h-8" />
    </button>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    @apply translate-y-[100%] opacity-0
}
</style>
