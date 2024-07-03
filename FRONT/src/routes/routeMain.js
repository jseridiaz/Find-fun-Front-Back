import { mainPortrait } from '../pages/mainPage/mainPage'

export const routeMain = (e) => {
  const main = document.querySelector('main')
  window.history.pushState({}, '', '/')
  mainPortrait(main)
}
