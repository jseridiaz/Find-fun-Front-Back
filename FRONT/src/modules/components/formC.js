export const formC = (id, className = '') => {
  const formular = document.createElement('form')

  formular.id = id
  if (className) {
    formular.classList.add(...className.split(' '))
  }
  return formular
}
