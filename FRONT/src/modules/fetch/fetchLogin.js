export const fetchLogin = async (email, password) => {
  const result = await fetch(`${import.meta.env.VITE_BACK}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then((res) => {
    return res.json()
  })
  return result
}
