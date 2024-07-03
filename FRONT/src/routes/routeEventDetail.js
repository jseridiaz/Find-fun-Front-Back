import { eventDetail } from '../pages/eventDetail/eventDetail'

export const routeEventDetail = (array) => {
  window.history.pushState({}, '', '/event')
  eventDetail(array)
}
