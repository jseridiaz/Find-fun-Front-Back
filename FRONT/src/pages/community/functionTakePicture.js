export const takePicture = (array) => {
  let arrayEvents = []
  for (let j = 0; j < array.length; j++) {
    const item = array[j]
    arrayEvents.push(item.name.name)
  }
  return Array.from(new Set(arrayEvents))
}
