import { liMain } from '../../data/header/liList'
import { activeLoader } from '../../modules/animation/loader/loader'
import { showLetter } from '../../modules/animation/showLetter/showLetter'
import { createHeader } from '../../modules/components/header/header'
import { fetchPictures } from '../../modules/fetch/mainPage/fetchPictures'
import { inputValue } from '../../modules/fetch/mainPage/inputValue'
import { form } from '../../modules/form/form'
import { routeRegister } from '../../routes/routeRegister'
import { routeSesion } from '../../routes/routeSesion'
import './mainPage.scss'

export const mainPortrait = async (main) => {
  const header = createHeader(liMain)
  main.innerHTML = ''
  main.className = 'flex-container unique-page main-page'
  const firstDiv = document.createElement('article')
  const secondDiv = document.createElement('article')
  const thirtyDiv = document.createElement('article')
  const loader = activeLoader('loader-login')

  const formular = form(
    'initial-login',
    'flex-container-column',
    'Log in',
    'and <u>take part</u>',
    'Log in'
  )
  const infoDiv = `<section id="section-info" >
  <div class="flex-container-column">
    <h1 id="first-h1"></h1>
    <p>
   <strong> Discover concerts, sporting events, and other activities you'll love</strong>!</p>  <p>If you can't find what you're looking for, feel free to post it yourself!</p>
    
  </div>
</section>`
  firstDiv.id = 'first-highlight'
  firstDiv.classList.add('img1')

  secondDiv.id = 'second-highlight'
  secondDiv.classList.add('img2')
  thirtyDiv.id = 'thirty-highlight'
  thirtyDiv.classList.add('img3')

  const img1 = document.createElement('img')
  const img2 = document.createElement('img')
  const img3 = document.createElement('img')

  img1.src = await fetchPictures('hzgs56Ze49s', '400', '700', 'small')
  img2.src = await fetchPictures('UmV2wr-Vbq8', '400', '700', 'small')
  img3.src = await fetchPictures('XmYSlYrupL8', '1080', '1400', 'regular')

  firstDiv.appendChild(img1)
  secondDiv.appendChild(img2)
  thirtyDiv.appendChild(img3)
  main.insertAdjacentElement('beforebegin', header)
  main.append(firstDiv, secondDiv, thirtyDiv, formular)

  main.innerHTML += infoDiv
  showLetter('Find Fun', '#first-h1')
  document.querySelector('.click-to-page').addEventListener('click', (e) => {
    e.preventDefault()
    routeRegister()
  })
  document
    .querySelector('#initial-login')
    .addEventListener('submit', async (e) => {
      const newPage = await inputValue(e, 'login')
      if (!newPage) {
        const messageErr = document.querySelector('#message-login')
        messageErr.classList.remove('no-visibility')
      } else {
        main.appendChild(loader)
        setTimeout(() => {
          loader.remove()
          routeSesion()
        }, 2000)
      }
    })
}
