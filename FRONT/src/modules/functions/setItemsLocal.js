export const setItemsLocal = (token, email, id) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', email)
  localStorage.setItem('id', id)
}
