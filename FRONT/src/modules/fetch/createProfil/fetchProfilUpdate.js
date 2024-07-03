import { getLocal } from '../../components/localStorage'

export const fetchProfilUpdate = async (
  id,
  name,
  surname,
  description,
  avatar
) => {
  try {
    const newForm = new FormData()
    newForm.append('name', name)
    newForm.append('surname', surname)
    newForm.append('description', description)

    if (avatar) {
      newForm.append('avatar', avatar)
    }

    if (avatar.files) {
      newForm.append(avatar)
    }
    const result = await fetch(
      `${import.meta.env.VITE_BACK}/api/attendees/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getLocal('token')}`
        },
        body: newForm
      }
    )
  } catch (err) {
    throw new Error('Error' + err.stack)
  }
}
