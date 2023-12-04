import { Buffer } from 'buffer'

export const loadImage = (event: Event, url: string) => {
  const img = event.target as HTMLImageElement
  fetch(url).then((response) => {
    if (response.ok) {
      img.src = response.url
    }
  })
}

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36)
  const randomString = Math.random().toString(36).substring(2, 10)
  return `${timestamp}-${randomString}`
}

export function stringToHex(input: string) {
  const buffer = Buffer.from(input, 'utf8')
  return buffer.toString('hex').padStart(8, '0')
}

export function hexToString(input: string) {
  const buffer = Buffer.from(input, 'hex')
  return buffer.toString('utf8')
}

export const deviceNameShorter = (device: string) => {
  switch (device) {
    case 'Equipo de juego (Consola)':
      return 'Consola'
    case 'Computadora personal (PC)':
      return 'PC/Laptop'
    case 'Dispositivos de realidad virtual':
      return 'Dispositivo RV'

    default:
      return device
  }
}
