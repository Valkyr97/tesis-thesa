<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  isSelected: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const element = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const handleUpdate = (id: any, value: any) => {}
const handleDelete = (id: any) => {}
</script>

<template>
  <div class="relative" v-if="element.type === 'questionItem'">
    <div class="flex place-content-between gap-x-6 flex-wrap w-full">
      <SurveyTitleQuestion
        v-model="element.title"
        :is-selected="isSelected"
        placeholder="Pregunta"
        @change.once="handleUpdate(element.id, 'title')"
      />
      <FormKit
        type="select"
        v-if="isSelected"
        outer-class="flex-1 flex-grow w-full"
        :options="questionTypes"
        :value="{ type: 'choiceQuestion', subtype: 'RADIO' }"
        name="questionType"
        :ignore="true"
        v-model="element.questionType"
      />
    </div>
    <div class="mt-1">
      <SurveyChoiceQuestion
        v-if="
          element.questionType && element.questionType.type === 'choiceQuestion'
        "
        v-model="element.questionChoices"
        @change="(field) => handleUpdate(element.id, field)"
        :is-selected="isSelected"
        :subtype="element.questionType.subtype"
      />
      <SurveyScaleQuestion
        v-if="
          element.questionType && element.questionType.type === 'scaleQuestion'
        "
        v-model="element.scaleOptions"
        @change="(field) => handleUpdate(element.id, field)"
      />
      <SurveyTextQuestion
        v-if="
          element.questionType && element.questionType.type === 'textQuestion'
        "
        :is-paragraph="element.questionType.paragraph"
      />
      <SurveyDateQuestion
        v-if="
          element.questionType && element.questionType.type === 'dateQuestion'
        "
      />
      <SurveyTimeQuestion
        v-if="
          element.questionType && element.questionType.type === 'timeQuestion'
        "
      />
    </div>
    <FormKit
      v-if="isSelected"
      type="checkbox"
      outer-class="w-fit"
      label="Obligatoria"
      :ignore="true"
      name="required"
      v-model="element.isRequired"
    />
    <FormKitIcon
      v-if="isSelected"
      icon="trash"
      class="flex h-5 absolute bottom-2 right-2 cursor-pointer"
      @click="handleDelete(element.id)"
    />
  </div>
</template>
