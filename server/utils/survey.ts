import axios, { AxiosInstance } from 'axios'
import jwt from 'jsonwebtoken'

let accessToken = ''
let tokenExpiration = 0

const axiosInstance = axios.create({
  baseURL: 'https://forms.googleapis.com/v1/',
})

axiosInstance.interceptors.request.use(async (config) => {
  if (Date.now() >= tokenExpiration - 60 || !accessToken) {
    const { access_token } = await oAuthLogin()
    accessToken = access_token
  }
  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

const getAccessToken = async () => {
  if (Date.now() >= tokenExpiration - 60 || !accessToken) {
    const { access_token } = await oAuthLogin()
    accessToken = access_token
  }
  return `Bearer ${accessToken}`
}

const oAuthLogin = async () => {
  try {
    const runtimeConfig = useRuntimeConfig()

    const issuedAt = Math.floor(Date.now() / 1000)
    tokenExpiration = issuedAt + 60 * 60

    const OAuthToken = jwt.sign(
      {
        iss: 'service-account@gamehub-402922.iam.gserviceaccount.com',
        scope:
          'https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file',
        aud: 'https://oauth2.googleapis.com/token',
        iat: issuedAt,
        exp: tokenExpiration,
      },
      runtimeConfig.serviceAccount_private_key,
      {
        header: {
          alg: 'RS256',
          typ: 'JWT',
          kid: runtimeConfig.serviceAccount_key_id,
        },
      }
    )

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: OAuthToken,
    })

    return response.data
  } catch (error: any) {
    console.log(error)
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Error obtainig google access',
    })
  }
}

export const getFormById = async (formId: string) => {
  try {
    const response = await axiosInstance.get(`forms/${formId}`)

    return response.data
  } catch (error: any) {
    console.log(error)
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      message: error.message || 'Error obtaining the form',
    })
  }
}

export const createForm = async (title: string, document_title: string) => {
  try {
    const response = await axiosInstance.post('forms', {
      info: {
        title: title,
        document_title: document_title,
      },
    })

    return response.data
  } catch (error: any) {
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      message: error.message || 'Error creating the form',
    })
  }
}

export const updateForm = async (formId: string, requests: any[]) => {
  try {
    const response = await axiosInstance.post(`forms/${formId}:batchUpdate`, {
      requests: [...requests],
    })

    return response.data
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Error updating the form',
    })
  }
}

export const getResponsesById = async (formId: string) => {
  try {
    const response = await axiosInstance.get(`forms/${formId}/responses`)

    return response.data
  } catch (e: any) {
    console.log(e)
    throw createError({
      statusCode: e.statusCode || e.status || e.code || 500,
      message: e.message || 'Error obtaining the responses of the form',
    })
  }
}

export const getForms = async () => {
  try {
    const token = await getAccessToken()
    const response = await axios.get(
      'https://www.googleapis.com/drive/v3/files',
      {
        headers: {
          Authorization: token,
        },
      }
    )

    return response.data
  } catch (error: any) {
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      message: error.message || 'Error obtaining the forms',
    })
  }
}

export const deleteForm = async (id: string) => {
  try {
    const token = await getAccessToken()
    const response = await axios.delete(
      `https://www.googleapis.com/drive/v3/files/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    return response.data
  } catch (error: any) {
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      message: error.message || 'Error obtaining the forms',
    })
  }
}
