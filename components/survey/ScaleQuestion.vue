<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', field: fields): void
}>()

enum fields {
  FROM = 'questionItem.question.scaleQuestion.low',
  TO = 'questionItem.question.scaleQuestion.high',
}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <FormKit type="group" name="scaleOptions" v-model="value" :ignore="true">
    <div class="flex gap-x-2 text-center">
      <div class="flex items-start gap-x-1.5">
        <span>De</span>
        <FormKit
          type="select"
          name="from"
          @input.passive="emit('change', fields.FROM)"
          outer-class="max-w-xs w-14"
          inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
          input-class="$remove:border-none $remove:py-2 !px-2"
          :options="[0, 1]"
        />
      </div>
      <div class="flex gap-x-1.5 items-start">
        <span>a</span>
        <FormKit
          type="select"
          name="to"
          @input.passive="emit('change', fields.TO)"
          outer-class="max-w-xs w-14"
          inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
          input-class="$remove:border-none $remove:py-2 !px-2"
          :options="[2, 3, 4, 5, 6, 7, 8, 9, 10]"
        />
      </div>
    </div>
  </FormKit>
</template>
