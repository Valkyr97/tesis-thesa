import { CourierClient } from '@trycourier/courier'

const runtimeConfig = useRuntimeConfig()

const courier = CourierClient({
  authorizationToken: runtimeConfig.courier_private_key,
})

export const sendSurveyEmail = async (
  email: string,
  forms: { title: string; uri: string }[]
) => {
  try {
    const response = await courier.send({
      message: {
        to: {
          email,
        },
        content: {
          title: 'Encuesta anual',
          version: '2022-01-01',
          body: 'Gracias por subscribirte, apreciamos que completes nuestros formularios',
          elements: [
            {
              type: 'group',
              loop: 'data.forms',
              elements: [
                { type: 'text', content: '{{$.item.title}}' },
                {
                  type: 'action',
                  content: 'Rellenar Encuesta',
                  href: '{{$.item.uri}}',
                },
              ],
            },
          ],
        },
        data: {
          forms,
        },
        routing: {
          method: 'single',
          channels: ['email'],
        },
      },
    })
  } catch (e) {
    console.log(e)
  }
}
