export const divC = (className, id = null) => {
  const div = document.createElement('div')
  if (id) {
    div.id = id
  }
  if (className) {
    div.classList.add(...className.split(' '))
  }
  return div
}
