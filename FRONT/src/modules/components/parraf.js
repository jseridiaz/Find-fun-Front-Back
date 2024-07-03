export const parraf = (title, text = '', typeP, classNames = null) => {
  const p = document.createElement(typeP)
  if (classNames) {
    p.classList.add(...classNames.split(' '))
  }
  p.innerHTML = `<strong>${title}</strong>  ${text}`
  return p
}
