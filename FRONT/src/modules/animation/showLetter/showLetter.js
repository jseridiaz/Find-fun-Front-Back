export const showLetter = (text, selector) => {
  let parraf = document.querySelector(selector)

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase()
    const span = document.createElement('span')
    span.textContent = char
    span.classList.add('no-visibility', 'render-letters')
    parraf.append(span)
  }
  const spans = document.querySelectorAll(`${selector}> span`)
  setTimeout(() => {
    for (let i = 0; i < spans.length; i++) {
      const e = spans[i]
      setTimeout(() => {
        e.classList.remove('no-visibility')
      }, i * 100)
    }
  }, 1000)
}
