export const selectFilter = (name, array) => {
  const select = document.createElement('select')
  select.name = name
  select.classList.add('all-select')
  const defaultOption = document.createElement('option')
  defaultOption.value = 'all'
  defaultOption.textContent = `All`
  defaultOption.selected = true
  select.appendChild(defaultOption)
  for (let i = 0; i < array.length; i++) {
    const el = array[i]
    const option = document.createElement('option')
    option.value = el
    option.textContent = el
    select.appendChild(option)
  }

  return select
}
