import { getLocal } from '../../components/localStorage'

export const fetchProfil = async (name, surname, description, avatar) => {
  try {
    const newForm = new FormData()
    newForm.append('name', name)
    newForm.append('surname', surname)
    newForm.append('description', description)

    if (avatar) {
      newForm.append('avatar', avatar)
    }

    const result = await fetch(`${import.meta.env.VITE_BACK}/api/attendees`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getLocal('token')}`
      },
      body: newForm
    })
    return result
  } catch (error) {
    throw new Error('Error' + error.stack)
  }
}
