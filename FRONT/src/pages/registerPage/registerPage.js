import './registerPage.scss'
import { liRegister } from '../../data/header/liList'
import { activeLoader } from '../../modules/animation/loader/loader'
import { inputValue } from '../../modules/fetch/mainPage/inputValue'
import { form } from '../../modules/form/form'
import { newHeader } from '../../modules/newHeader/newHeader'
import { routeMain } from '../../routes/routeMain'
import { readMain } from '../../modules/functions/readMain'
import {
  validateEmail,
  validatePassword
} from '../../modules/functions/validatorForm'
export const registerPage = () => {
  const main = readMain()
  newHeader(liRegister, main, 'register-shape')

  const formular = form(
    'register-form',
    'register-container',
    'Sing up',
    'Create your profil here',
    'Sign up'
  )

  main.innerHTML = ''
  main.className = ''
  main.classList.add('register-main', 'flex-container')
  main.append(formular)

  formular.addEventListener('submit', async (e) => {
    e.preventDefault()
    const [email, password] = e.target
    const msn = password.nextElementSibling
    if (main.classList.contains('register-main')) {
      const errorEmail = validateEmail(email, msn)
      if (errorEmail) {
        return
      }
      const errorInput = validatePassword(e, password, msn)

      password.addEventListener('blur', (e) => {
        validatePassword(e, password, msn)
      })
      if (errorInput) {
        return
      }
    }
    const request = await inputValue(e, 'register')
    if (request) {
      document.querySelector('#message-login').className = 'success'
      const loader = activeLoader('loader-register')
      formular.appendChild(loader)

      setTimeout(() => {
        loader.remove()
        routeMain(main)
      }, 1500)
    }
  })
}
