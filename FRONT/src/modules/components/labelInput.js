export const labelInput = (
  labelText,
  idInput,
  placeholder = '',
  typeInput = 'input',
  required = false,
  type = 'text'
) => {
  const label = document.createElement('label')
  const input = document.createElement(typeInput)
  label.textContent = labelText
  input.id = idInput
  label.htmlFor = idInput
  if (placeholder) {
    input.placeholder = placeholder
  }
  if (required) {
    input.required = true
  }
  if (type !== 'text') {
    input.type = type
  }
  setTimeout(() => {
    input.insertAdjacentElement('beforebegin', label)
  }, 0.5)
  return input
}
