import { createHeader } from '../components/header/header'

export const newHeader = (listLi, main, className = '') => {
  main.insertAdjacentElement('beforebegin', createHeader(listLi, className))
}
