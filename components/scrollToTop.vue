<script setup lang="ts">
import { FormKitIcon } from "@formkit/vue";

const showDownButton = ref(false);
const showUpButton = ref(false);

const handleScroll = () => {
  const scrollDistance = window.scrollY || document.documentElement.scrollTop;
  showDownButton.value = scrollDistance >= window.innerHeight;

  const windowHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  showUpButton.value = scrollPosition < scrollHeight - windowHeight;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToBottom = () => {
  const { scrollHeight } = document.body;
  window.scrollTo({
    top: scrollHeight,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll()
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition>
    <button
      class="fixed bottom-1 right-1 xl:bottom-4 xl:right-4 border p-1.5 xl:p-2 bg-gray-800 text-white bg-opacity-40"
      type="button"
      v-if="(!showDownButton) && showUpButton"
      @click="scrollToBottom"
    >
      <FormKitIcon icon="down" class="flex w-6 h-6 xl:w-8 xl:h-8" />
    </button>
  </Transition>
  <Transition>
    <button
      class="fixed bottom-1 right-1 xl:bottom-4 xl:right-4 border p-1.5 xl:p-2 bg-gray-800 text-white bg-opacity-40"
      type="button"
      v-if="showDownButton || !showUpButton"
      @click="scrollToTop"
    >
      <FormKitIcon icon="up" class="flex w-6 h-6 xl:w-8 xl:h-8" />
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
  @apply translate-y-[100%] opacity-0;
}
</style>
