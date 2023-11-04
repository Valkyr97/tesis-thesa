<script setup lang="ts"></script>
<template>
  <FormKit
    type="date"
    disabled
    outer-class="max-w-xs"
    suffix-icon="date"
    suffix-icon-class="$remove:p-3 $remove:pr-3 border-b"
    inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
    input-class="$remove:border-none border-b border-dashed $remove:py-2 !px-2"
    :ignore="true"
  />
</template>
