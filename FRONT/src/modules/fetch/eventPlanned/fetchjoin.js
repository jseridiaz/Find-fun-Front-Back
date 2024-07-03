import { getLocal } from '../../components/localStorage'

export const fetchJoin = async (route, participants) => {
  const token = getLocal('token')
  const post = await fetch(`${import.meta.env.VITE_BACK}/api/user/${route}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ participants })
  })
  return post
}
