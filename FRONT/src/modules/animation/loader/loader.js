import './loader.scss'
import { divC } from '../../components/div'
export const activeLoader = (className) => {
  const loader = divC(className, 'loader-container')
  loader.style.position = 'absolute'
  return loader
}
