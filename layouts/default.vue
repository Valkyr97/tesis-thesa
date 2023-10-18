<script setup lang="ts">

defineProps<{
  transparentNav?: boolean
}>()

</script>

<template>
  <Nav :transparent="transparentNav" />
  <div class="default_layout pt-44 xl:pt-56">
    <slot />
  </div>
  <Footer />
  <ScrollToTop />
</template>

<style scoped></style>
