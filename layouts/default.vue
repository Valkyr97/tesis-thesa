<script setup lang="ts">
withDefaults(
  defineProps<{
    transparentNav?: boolean
    nav?: boolean
    footer?: boolean
    scroll?: boolean
  }>(),
  {
    nav: true,
    footer: true,
    scroll: true,
  }
)
</script>

<template>
  <Nav v-if="nav" :transparent="transparentNav" />
  <div :class="{ 'pt-44 xl:pt-56': nav }" class="default_layout">
    <slot />
  </div>
  <Footer v-if="footer" />
  <ScrollToTop class="data-html2canvas-ignore" v-if="scroll" />
</template>

<style scoped></style>
