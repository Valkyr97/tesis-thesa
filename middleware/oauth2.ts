import { FormRedirectUri } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const path = to.hash
  let redirectUri: FormRedirectUri | undefined

  switch (to.name) {
    case 'survey_list':
      redirectUri = FormRedirectUri.LIST
      break

    case 'survey_form':
      redirectUri = FormRedirectUri.FORM

    default:
      redirectUri = undefined
  }

  const { trySampleRequest, oauth2SignIn } = useOauth()

  const regex = /[#&]([^=&]+)=([^&]*)/g
  let params: any = {}

  for (const match of path.matchAll(regex)) {
    const [, key, value] = match
    params[decodeURIComponent(key)] = decodeURIComponent(value)
  }

  if (Object.keys(params).length === 0) {
    params = JSON.parse(localStorage.getItem('oauth2-params') || '{}')
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-params', JSON.stringify(params))
    if (params['state'] && params['state'] == 'try_sample_request') {
      if (!(await trySampleRequest())) {
        oauth2SignIn(redirectUri)
        return abortNavigation()
      }
    }
  } else {
    oauth2SignIn(redirectUri)
    return abortNavigation()
  }
})
