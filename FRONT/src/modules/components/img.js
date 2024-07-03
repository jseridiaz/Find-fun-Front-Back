export const imgC = (src, id = '', className = '') => {
  const img = document.createElement('img')
  img.src = src
  if (className) {
    img.classList.add(className)
  }
  if (id) {
    img.id = id
  }

  img.loading = 'lazy'
  return img
}
