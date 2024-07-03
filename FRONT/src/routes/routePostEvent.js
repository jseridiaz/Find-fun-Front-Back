import { postEvent } from '../pages/postEvent/postEvent'

export const routePostEvent = () => {
  window.history.pushState({}, '', '/postEvent')
  postEvent()
}
