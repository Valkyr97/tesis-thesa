<script setup lang="ts">
import draggable from 'vuedraggable'
import { FormKitIcon } from '@formkit/vue'

import useSurvey from '~/composables/api/useSurvey'

definePageMeta({
  middleware: 'oauth2',
  name: 'survey_form',
})

onBeforeRouteLeave(() => {
  localStorage.removeItem('formToUpdateId')
})

// State
const router = useRouter()
const { createSurvey, fetchSurveyById, updateFormInGoogle } = useSurvey()
const id = JSON.parse(localStorage.getItem('formToUpdateId') || '{}')

const formInfo = ref({
  title: '',
  description: '',
  formId: '',
})
const selected = ref()

const surveyForms = ref<any[]>([])
const requests = ref<any[]>([])

// Request
const response = await fetchSurveyById(Number(id), {
  onResponseCallback: ({ response: data }) => {
    if (id) {
      formInfo.value = {
        title: data._data.info?.title,
        description: data._data.info?.description,
        formId: data._data.formId,
      }

      if (data._data.items) {
        const oldData = transformDataFromGoogleData(data._data.items)
        surveyForms.value = oldData
      }
    }
  },
})

// Getters
const readyForSaveRequests = computed(() =>
  requests.value.map((request) => {
    const item = surveyForms.value.find((f) => f.id === request.id)
    return defineRequest(request, item)
  })
)

// Actions
const handleSubmit = async (values: any) => {
  let response
  if (!id)
    response = await createSurvey(values.title, readyForSaveRequests.value)
  else
    response = await updateFormInGoogle(
      formInfo.value.formId,
      readyForSaveRequests.value
    )
  console.log(response)
  response?.refresh()
  // router.push('/private/survey/list')
}

const handleClone = (e: any) => {
  const newItem = { ...e }
  newItem.id = generateUniqueId()
  if (newItem.type === 'questionItem') {
    newItem.questionType = {
      type: 'choiceQuestion',
      subtype: 'RADIO',
      paragraph: undefined,
    }
    newItem.questionChoices = ['Opción 1']
  }
  delete newItem.name
  selected.value = newItem.id
  return newItem
}

const handleSelect = (element: any) => {
  selected.value = element.id
}

const handleDelete = (formToDeleteId: any) => {
  surveyForms.value = surveyForms.value.filter((f: any, i: number) => {
    if (f.id !== formToDeleteId) return true
    requests.value.push({
      deleteItem: {
        location: { index: i },
      },
    })
    return false
  })
  selected.value = null
}

const handleUpdate = async (id: string, mask: string, index: number) => {
  let item = requests.value.find((r) => r.id === id && !r.isNew)

  if (item) {
    item = {
      ...item,
      updateMask: item.updateMask.add(mask),
    }
    return
  } else
    requests.value.push({
      isNew: false,
      isUpdated: true,
      id,
      updateMask: new Set([mask]),
      position: index,
    })
}

const handleMoved = (e: any) => {
  requests.value.push({
    moveItem: {
      originalLocation: { index: e.oldIndex },
      newLocation: { index: e.newIndex },
    },
  })
}

const handleAdd = (e: any) => {
  requests.value.push({
    isNew: true,
  })
}
</script>

<template>
  <div>
    <FormKit type="form" @submit="handleSubmit" #default="{ value }">
      <FormKit
        required
        type="text"
        name="title"
        placeholder="Formulario"
        v-model="formInfo.title"
      />
      <FormKit
        auto-height
        type="textarea"
        name="description"
        placeholder="Descripción"
        v-model="formInfo.description"
      />
      <div class="flex w-full place-content-between">
        <div class="flex flex-col w-2/3 p-2">
          <draggable
            item-key="id"
            class="flex flex-col gap-y-3 items-start flex-wrap pb-12 h-full place-content-start"
            v-model="surveyForms"
            :group="{
              name: 'forms',
            }"
            ghostClass="ghost"
            handle=".handler"
            :animation="200"
            @sort="handleMoved"
            @add="handleAdd"
          >
            <template #item="{ element, index }">
              <div
                @click="handleSelect(element)"
                :class="{ 'shadow-md': selected === element.id }"
                class="w-full pb-4 group border px-2"
                v-if="
                  element.action !== 'deleteItem' &&
                  element.action !== 'moveItem'
                "
              >
                <BarHolder
                  :is-selected="selected === element.id"
                  class="handler"
                />
                <!-- Question Item -->
                <div class="relative" v-if="element.type === 'questionItem'">
                  <div
                    class="flex place-content-between gap-x-6 flex-wrap w-full"
                  >
                    <SurveyTitleQuestion
                      v-model="element.title"
                      :is-selected="element.id === selected"
                      placeholder="Pregunta"
                      @change="handleUpdate(element.id, 'title', index)"
                    />
                    <FormKit
                      type="select"
                      v-if="selected === element.id"
                      outer-class="flex-1 flex-grow w-full"
                      :options="questionTypes"
                      name="questionType"
                      :ignore="true"
                      v-model="element.questionType"
                      @input.passive="
                        handleUpdate(element.id, 'questionItem.question', index)
                      "
                    />
                  </div>
                  <div class="mt-1">
                    <SurveyChoiceQuestion
                      v-if="
                        element.questionType &&
                        element.questionType.type === 'choiceQuestion'
                      "
                      v-model="element.questionChoices"
                      @change="
                        (field) => handleUpdate(element.id, field, index)
                      "
                      :is-selected="selected === element.id"
                      :subtype="element.questionType.subtype"
                    />
                    <SurveyScaleQuestion
                      v-if="
                        element.questionType &&
                        element.questionType.type === 'scaleQuestion'
                      "
                      v-model="element.scaleOptions"
                      @change="
                        (field) => handleUpdate(element.id, field, index)
                      "
                    />
                    <SurveyTextQuestion
                      v-if="
                        element.questionType &&
                        element.questionType.type === 'textQuestion'
                      "
                      :is-paragraph="element.questionType.paragraph"
                    />
                    <SurveyDateQuestion
                      v-if="
                        element.questionType &&
                        element.questionType.type === 'dateQuestion'
                      "
                    />
                    <SurveyTimeQuestion
                      v-if="
                        element.questionType &&
                        element.questionType.type === 'timeQuestion'
                      "
                    />
                  </div>
                  <FormKit
                    v-if="selected === element.id"
                    type="checkbox"
                    outer-class="w-fit"
                    label="Obligatoria"
                    :ignore="true"
                    name="required"
                    v-model="element.isRequired"
                  />
                  <FormKitIcon
                    v-if="selected === element.id"
                    icon="trash"
                    class="flex h-5 absolute bottom-2 right-2 cursor-pointer"
                    @click="handleDelete(element.id)"
                  />
                </div>

                <!-- Text Item -->
                <div v-else-if="element.type === 'textItem'" class="relative">
                  <SurveyTitleQuestion
                    v-model="element.title"
                    :is-selected="element.id === selected"
                    placeholder="Sin Título"
                  />
                  <FormKit
                    v-if="selected === element.id"
                    type="textarea"
                    auto-height
                    name="description"
                    placeholder="Descripción (opcional)"
                    outer-class="flex-1 max-w-md"
                    inner-class="$remove:ring-1 $remove:focus-within:ring-blue-500 $remove:focus-within:ring-2"
                    input-class="$remove:border-none border-b $remove:py-2 !px-2 h-14"
                    :ignore="true"
                    v-model="element.description"
                  />
                  <p v-else>
                    {{ element.description }}
                  </p>
                  <FormKitIcon
                    v-if="selected === element.id"
                    icon="trash"
                    class="flex h-5 absolute top-0 right-2 cursor-pointer"
                    @click="handleDelete(element.id)"
                  />
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="">
          <draggable
            class="flex gap-x-2 gap-y-2 flex-wrap flex-col sticky top-0"
            :list="formItems"
            :clone="handleClone"
            :group="{ name: 'forms', pull: 'clone', put: false }"
            item-key="type"
            :sort="false"
            ghostClass="ghost"
          >
            <template #item="{ element }">
              <pre>{{ element }}</pre>
            </template>
          </draggable>
        </div>
      </div>
    </FormKit>
  </div>
</template>
