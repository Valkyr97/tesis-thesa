export const loadImage = (event: Event, url: string) => {
  const img = event.target as HTMLImageElement
  fetch(url).then((response) => {
    if (response.ok) {
      img.src = response.url
    }
  })
}