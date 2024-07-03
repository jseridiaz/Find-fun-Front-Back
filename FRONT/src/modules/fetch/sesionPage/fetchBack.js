import { getLocal } from '../../components/localStorage'
import { printCards } from '../../printArray/printArray'

export const fetchBack = async (route, insertIn, token) => {
  const array = await fetch(
    /*${import.meta.env.VITE_BACK}*/ `${import.meta.env.VITE_BACK}/api/${route}`
  )
    .then((res) => res.json() /*.length>0?res.json():*/)

    .catch((err) => console.log(err))

  printCards(array, insertIn, token)
}
export const fetchBackAttendes = async (route) => {
  const array = await fetch(`${import.meta.env.VITE_BACK}/api/${route}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getLocal('token')}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  return array.result
}
