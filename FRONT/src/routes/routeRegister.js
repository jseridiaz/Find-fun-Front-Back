import { registerPage } from '../pages/registerPage/registerPage'

export const routeRegister = (e) => {
  window.history.pushState({}, '', '/register')
  registerPage()
}
