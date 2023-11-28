<script setup lang="ts">
import draggable from 'vuedraggable'
import { FormKitIcon } from '@formkit/vue'
import { QuestionType } from '~/enums'
import { useToast } from 'vue-toastification'

definePageMeta({
  // middleware: 'oauth2',
  name: 'survey_form',
})

// State
const formToUpdateId = localStorage.getItem('formToUpdateId')
const id = formToUpdateId && JSON.parse(formToUpdateId)

const formInfo = ref({
  title: '',
  description: '',
  formId: '',
})
const selected = ref()

const { createSurvey, fetchSurveyById, updateSurvey } = useSurvey()
const questionStore = useQuestion()
const uiStore = useUiStore()
const toast = useToast()

const requests = ref<any[]>([])

const surveyForms = ref<any[]>([])

const { data, error, status, pending } =
  await questionStore.getObligatoryQuestions({
    onResponse: (response) => {
      surveyForms.value = response.map((q: any, i: number) => ({
        ...transformFromDbData(q),
        position: i,
      }))
    },
  })

uiStore.isLoading = pending.value

if (error.value) {
  toast.error(
    'Lo sentimos ha ocurrido un error, por favor verifique su conexión a internet'
  )
}

const response =
  id &&
  (await fetchSurveyById(id, {
    onResponse: ({ response: data }: any) => {
      console.log(data)
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
  }))

// Getters
const readyForSaveRequests = computed(() =>
  requests.value.map((request) => {
    const item = surveyForms.value.find((f) => f.id === request.id)
    return defineRequest(request, item)
  })
)

const obligatoryQuestions = computed(() =>
  data.value?.map((q) => transformFromDbData(q))
)

// Actions
const handleSubmit = async (values: any) => {
  try {
    if (!id) {
      await createSurvey(values.title, readyForSaveRequests.value)
    } else {
      await updateSurvey(formInfo.value.formId, readyForSaveRequests.value)
      response.refresh()
    }
  } catch (e) {
    console.log(e)
  }
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
  if (isObligatoryForm(formToDeleteId)) return

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
  console.log(e.oldIndex)
  requests.value.push({
    isNew: true,
    id: surveyForms.value[e.newIndex]?.id,
    position: e.oldIndex,
  })
}

onMounted(() => {
  if (!id && obligatoryQuestions.value) {
    for (let i of obligatoryQuestions.value) {
      requests.value.push({ isNew: true, id: i.id })
    }
  }
})

onBeforeRouteLeave(() => {
  localStorage.removeItem('formToUpdateId')
})
</script>

<template>
  <div>
    <FormKit
      type="form"
      @submit="handleSubmit"
      :submit-label="id ? 'Actualizar' : 'Crear'"
    >
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
        <div class="flex flex-col w-full p-2">
          <h3 class="text-gray-600 text-xl" v-if="surveyForms?.length < 1">
            Arrastre un elemento para comenzar a crear su formulario
          </h3>
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
              >
                <BarHolder
                  :is-selected="selected === element.id"
                  class="handler"
                />
                <!-- Question Item -->
                <div class="relative" v-if="element.type === 'questionItem'">
                  <div
                    class="flex place-content-between gap-x-6 flex-wrap w-full mb-6"
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
                      :disabled="isObligatoryForm(element.id)"
                      outer-class="flex w-fit"
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
                      :disabled="isObligatoryForm(element.id)"
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
                    v-if="
                      selected === element.id && !isObligatoryForm(element.id)
                    "
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
                    @change="handleUpdate(element.id, 'title', index)"
                  />
                  <FormKit
                    v-if="selected === element.id"
                    type="textarea"
                    @input.passive="
                      handleUpdate(element.id, 'description', index)
                    "
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
                    v-if="
                      selected === element.id && !isObligatoryForm(element.id)
                    "
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
            class="flex gap-x-2 gap-y-2 flex-wrap flex-col sticky top-4"
            :list="formItems"
            :clone="handleClone"
            :group="{ name: 'forms', pull: 'clone', put: false }"
            item-key="type"
            :sort="false"
            ghostClass="ghost"
          >
            <template #item="{ element }">
              <div
                class="flex gap-x-3 border py-0.5 px-1 items-center rounded-sm border-gray-400 cursor-pointer"
              >
                <FormKitIcon :icon="element.icon" class="flex h-4" />
                <span>{{ element.name }}</span>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </FormKit>
  </div>
</template>
