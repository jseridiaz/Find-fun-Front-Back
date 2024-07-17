import { liComponent } from '../../modules/components/liComponent'
import { getLocal } from '../../modules/components/localStorage'

import { routerCommunity } from '../../routes/routeCommunity'
import { routeMain } from '../../routes/routeMain'
import { routePostEvent } from '../../routes/routePostEvent'
import { routerProfil } from '../../routes/routeProfil'
import { routeRegister } from '../../routes/routeRegister'
import { routeSesion } from '../../routes/routeSesion'
import { alertNoRegistered } from '../alert/alertMsn'

export const liMain = [
  {
    component: liComponent('no-register', 'Entry without Login'),
    event: routeSesion
  },
  {
    component: liComponent('signup-li', 'Sign up'),
    event: routeRegister
  }
]
export const liRegister = [
  {
    component: liComponent('login-li', 'Log in'),
    event: routeMain
  }
]

export const liEventsPlanned = (token) => [
  {
    component: liComponent('events-li', 'Events'),
    event: routeSesion
  },
  {
    component: liComponent('post-event-li', 'Post event'),
    event: token ? routePostEvent : alertNoRegistered
  },
  {
    component: liComponent('profile-info', 'Profile'),
    event: token ? routerProfil : alertNoRegistered
  },
  {
    component: liComponent('community-info', 'Community'),
    event: token ? routerCommunity : alertNoRegistered
  },
  {
    component: token
      ? liComponent('Log-out', 'Log out')
      : liComponent('signup-li', 'Sign up'),
    event: () => {
      if (token) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('id')
        routeMain()
      } else {
        routeRegister()
      }
    }
  }
]
