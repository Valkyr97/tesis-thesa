import { FormRedirectUri } from '#imports'

export const useOAuth = defineStore('oAuth', () => {
  const CLIENT_ID =
    '904292748520-b6vmkudb5479e30s99ieq62vg3133fd0.apps.googleusercontent.com'

  async function trySampleRequest() {
    const params = JSON.parse(localStorage.getItem('oauth2-params')!)
    if (params && params['access_token']) {
      const { error, status, data } = await useFetch(
        'https://www.googleapis.com/drive/v3/about?fields=user&' +
          'access_token=' +
          params['access_token']
      )
      if (status.value === 'error' || error.value) {
        return false
      }
    } else {
      return false
    }
    return true
  }

  function oauth2SignIn(redirect_uri?: FormRedirectUri) {
    const REDIRECT_URI = redirect_uri ?? FormRedirectUri.FORM
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

    // Create element to open OAuth 2.0 endpoint in new window.
    const form = document.createElement('form')
    form.setAttribute('method', 'GET') // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint)

    // Parameters to pass to OAuth 2.0 endpoint.
    const params: any = {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope:
        'https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file',
      state: 'try_sample_request',
      include_granted_scopes: 'true',
      response_type: 'token',
    }

    // Add form parameters as hidden input values.
    for (let p in params) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form)
    form.submit()
  }

  return {
    trySampleRequest,
    oauth2SignIn,
  }
})
