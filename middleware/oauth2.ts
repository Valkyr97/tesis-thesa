import { FormRedirectUri } from '#imports'
import useAuth from '~/stores/api/useAuth'
import { useOAuth } from '~/stores/oAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const path = to.hash

  let redirectUri: FormRedirectUri | undefined

  const auth = useOAuth()
  const { refreshToken } = useAuth()

  switch (to.name) {
    case 'survey_list':
      redirectUri = FormRedirectUri.LIST
      break

    case 'survey_form':
      redirectUri = FormRedirectUri.FORM
      break

    default:
      redirectUri = undefined
  }

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
      if (!(await auth.trySampleRequest())) {
        await refreshToken()
        auth.oauth2SignIn(redirectUri)
        return abortNavigation()
      }
    }
  } else {
    await refreshToken()
    auth.oauth2SignIn(redirectUri)
    return abortNavigation()
  }
})
