import { footer } from './src/modules/components/footer/footer'
import { getLocal } from './src/modules/components/localStorage'

import { communityPage } from './src/pages/community/communityPage'
import { mainPortrait } from './src/pages/mainPage/mainPage'
import { profilPage } from './src/pages/profilPage/profilPage'
import { registerPage } from './src/pages/registerPage/registerPage'
import { sesionLoged } from './src/pages/sesion/sesionPage'
import { routeSesion } from './src/routes/routeSesion'

const main = document.createElement('main')
main.id = 'main-container'
document.body.appendChild(main)

if (getLocal('token')) {
  routeSesion()
} else {
  mainPortrait(main)
}

footer()

// *Get the background image to the Sesion page

window.addEventListener('popstate', (e) => {
  switch (window.location.pathname) {
    case '/home':
      sesionLoged()
      break
    case '/register':
      registerPage()
      break
    case '/community':
      communityPage()
      break
    case '/myProfil':
      profilPage()
      break
    case '/postEvent':
      postEvent()
    case '/':
      mainPortrait(main)
    default:
      mainPortrait(main)
      break
  }
})
