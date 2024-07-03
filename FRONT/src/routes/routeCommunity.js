import { communityPage } from '../pages/community/communityPage'

export const routerCommunity = () => {
  window.history.pushState({}, '', '/community')
  communityPage()
}
export const routerParticipant = (id) => {
  window.history.pushState({}, '', `/community/${id}`)
}
