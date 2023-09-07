export type IDev = {
  id: string
  name: string
  specialization?: string
  avatar: string
  resumen: string
  skills: {
    tool: string
    avility: number
  }[]
  projects: string[]
  phone?: string
  address?: string
  email?: string
  socialMedias?: ISocialMedia[]
}

type ISocialMedia = {
  name: string
  icon: string
  link: string
}
