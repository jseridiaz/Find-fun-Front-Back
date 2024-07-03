import { getLocal } from '../../components/localStorage'

export const generalFetch = async (route, method = 'GET') =>
  await fetch(`${import.meta.env.VITE_BACK}/api/${route}`, {
    method,
    headers: { Authorization: `Bearer ${getLocal('token')}` }
  }).then((res) => res.json())
