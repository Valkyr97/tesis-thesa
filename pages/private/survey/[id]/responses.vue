<script setup lang="ts">
definePageMeta({
  validate(route) {
    return typeof route.params.id === 'string'
  },
})

const route = useRoute()
const { id } = route.params

const { fetchSurveyById, fetchSurveyResponses } = useSurvey()

const { data: survey } = await fetchSurveyById(id)

const { data: responsesData } = await fetchSurveyResponses(id)

const questions = computed(
  () =>
    survey.value?.items?.map((item: any) => {
      if (item.questionItem)
        return { title: item.title, id: item.questionItem.question.questionId }
    }) || []
)

const responses = computed(
  () =>
    responsesData.value?.responses?.map((response: any) => {
      if (questions.value) {
        return questions.value.map(
          (q: any) => response.answers[q.id]?.textAnswers.answers
        )
      }
    }) || []
)
</script>

<template>
  <div class="overflow-auto max-w-4xl max-h-screen">
    <table class="text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 relative">
        <tr>
          <th class="px-6 py-3">Preguntas</th>
          <th class="whitespace-nowrap px-6 py-3" v-for="question in questions">
            {{ question.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b overflow-auto cursor-auto select-none relative group"
          v-for="(response, i) in responses"
        >
          <td class="px-6 py-4">{{ i }}</td>
          <td class="px-6 py-4" v-for="(answers, i) in response">
            <p v-for="answer in answers">
              {{ answer.value }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
