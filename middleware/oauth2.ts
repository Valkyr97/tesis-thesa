export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to.fullPath)

  const path = to.hash

  const { trySampleRequest, oauth2SignIn } = useOauth()

  const regex = /[#&]([^=&]+)=([^&]*)/g
  const params: any = {}

  for (const match of path.matchAll(regex)) {
    const [, key, value] = match
    params[decodeURIComponent(key)] = decodeURIComponent(value)
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-params', JSON.stringify(params))
    if (params['state'] && params['state'] == 'try_sample_request') {
      console.log('sample')
      if (!(await trySampleRequest())) {
        oauth2SignIn()
      }
    }
  } else {
    oauth2SignIn()
  }
})
