import { profilPage } from '../pages/profilPage/profilPage'

export const routerProfil = () => {
  window.history.pushState({}, '', '/myProfil')
  profilPage()
}
