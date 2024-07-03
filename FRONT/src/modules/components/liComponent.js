export const liComponent = (id = '', text = '') => {
  const li = document.createElement('li')
  li.id = id
  li.textContent = text
  return li
}
