import { sesionLoged } from '../pages/sesion/sesionPage'

export const routeSesion = (e) => {
  window.history.pushState({}, '', '/home')
  sesionLoged()
}
