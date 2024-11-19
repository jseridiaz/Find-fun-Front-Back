import { divC } from '../div'
import { imgC } from '../img'
import { clickAnchor } from './clickAnchor'
import { deployMenuMobile } from './deployMenuMobile'

export const createHeader = (liList, className = '') => {
  if (document.querySelector('header')) {
    document.querySelector('header').remove()
  }
  const header = document.createElement('header')
  const a = document.createElement('a')
  const img = document.createElement('img')
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')
  const divMenu = divC('none', 'menu-container-mobile')
  const imgMenu = imgC(
    'https://res.cloudinary.com/ddybbosdk/image/upload/v1719609521/menu-burger_zieiqy.png',
    'menu-mobile-img'
  )

  header.id = 'header-main'
  header.className = className
  a.href = 'https://find-fun-front-back.vercel.app/home'
  img.src =
    'https://res.cloudinary.com/ddybbosdk/image/upload/v1718209364/Logo_jcxrih.png'
  img.loading = 'lazy'

  divMenu.addEventListener('click', () => {
    //* Animation menu mobile in component
    deployMenuMobile(nav, ul)
  })

  a.addEventListener('click', (e) => {
    clickAnchor(e)
  })

  a.append(img)
  for (let i = 0; i < liList.length; i++) {
    const el = liList[i]
    const li = el.component
    const a = document.createElement('a')

    a.addEventListener('click', (e) => {
      if (
        !nav.classList.contains('deploy') ||
        e.target.textContent == 'Events' ||
        e.target.textContent == 'Log out'
      ) {
        el.event()
      } else {
        document
          .querySelectorAll('ul.deploy > li')
          .forEach((e) => e.classList.remove('deploy'))
        el.event()
        nav.classList.remove('deploy')
        ul.classList.remove('deploy')
      }
    })

    a.textContent = li.textContent
    li.textContent = ''
    a.className = 'links'
    li.append(a)
    ul.append(li)
  }
  nav.append(ul)
  divMenu.append(imgMenu)
  header.append(a, nav, divMenu)

  return header
}
