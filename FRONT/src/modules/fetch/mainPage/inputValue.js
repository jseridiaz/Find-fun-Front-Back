import { hideErrMsn } from '../../animation/hideErrMsn/hideErrMsn'
import { readMain } from '../../functions/readMain'
import { setItemsLocal } from '../../functions/setItemsLocal'

export const inputValue = async (e, endpoint) => {
  e.preventDefault()
  const main = readMain()
  const [email, password] = e.target
  const message = document.querySelector('#message-login')

  const request = await fetch(
    `${import.meta.env.VITE_BACK}/api/auth/${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
  )
    .then((res) => {
      return res.json()
    })
    .then(async (res) => {
      try {
        if (res.result && main.classList.contains('main-page')) {
          message.textContent = res.message
          message.classList.add('success')
          message.classList.remove('no-visibility')
          setItemsLocal(
            res.result.token,
            res.result.userFound.email,
            res.result.userFound._id
          )
          hideErrMsn(message, 2000)
        } else {
          if (message.classList.contains('success')) {
            message.classList.remove('success')
          }
          message.textContent = res.message
          message.classList.remove('no-visibility')
        }
        return res.result
      } catch (error) {
        throw new Error('Error' + error.stack)
      }
    })
  return request
}
