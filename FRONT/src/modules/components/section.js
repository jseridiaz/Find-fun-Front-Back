export const sectionContainer = (id = '', className = '', typeContainer) => {
  const section = document.createElement(typeContainer)
  if (id) {
    section.id = id
  }
  if (className) {
    section.classList.add(...className.split(' '))
  }

  return section
}
