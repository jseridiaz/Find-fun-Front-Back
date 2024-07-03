export const btn = (id, text, type = 'submit', className = '') => {
  const btn = document.createElement('button')
  if (id) {
    btn.id = id
  }
  if (className) {
    btn.classList.add(className)
  }
  btn.textContent = text
  btn.type = type
  return btn
}
