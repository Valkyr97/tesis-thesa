<script setup lang="ts">
const props = defineProps(['modelValue', 'isSelected', 'subtype', 'disabled'])
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', field: fields): void
}>()

enum fields {
  OPTIONS = 'questionItem.question.choiceQuestion.options',
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
  <FormKit
    :ignore="true"
    type="list"
    help="Escoja las opciones para su pregunta de opciones"
    dynamic
    v-model="value"
    :disabled="disabled"
    #default="{ items, node }"
  >
    <FormKit
      v-for="(item, i) in items"
      :key="item"
      :index="i"
      @input.passive="emit('change', fields.OPTIONS)"
      type="text"
      validation="required"
      outer-class=""
      placeholder="Opción"
      inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
      input-class="$remove:border-none border-b $remove:py-2 !px-2"
      :prefix-icon="subtype === 'RADIO' ? 'radio' : 'checkbox'"
      prefix-icon-class="$remove:w-10 w-6 border-b"
      :suffix-icon="isSelected && value.length > 1 ? 'trash' : false"
      suffix-icon-class="$remove:p-3 $remove:pr-3 border-b"
      @suffix-icon-click="() => (value = value.splice(i, 1))"
      :sections-schema="{
        suffixIcon: {
          // change wrapper to a button for accessibility
          $el: 'button',
          attrs: {
            type: 'button',
          },
        },
      }"
    />

    <button
      @click="
        () => {
          value = [...value, '']
          $emit('change', fields.OPTIONS)
        }
      "
      :disabled="disabled"
      v-if="isSelected && !disabled"
      type="button"
      class="border px-4 py-0.5 mb-4 -mt-2 rounded-sm border-gray-400 disabled:opacity-60"
    >
      Añadir opción
    </button>
  </FormKit>
</template>
