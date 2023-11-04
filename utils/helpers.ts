export const loadImage = (event: Event, url: string) => {
  const img = event.target as HTMLImageElement
  fetch(url).then((response) => {
    if (response.ok) {
      img.src = response.url
    }
  })
}

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomString}`;
};