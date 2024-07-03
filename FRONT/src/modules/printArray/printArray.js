import '../../../variables.scss'
import { alertNoRegistered } from '../../data/alert/alertMsn'
import { colourBtn } from '../../data/card/colourBtn'
import { routeEventDetail } from '../../routes/routeEventDetail'
import { activeCarousel, clickBtn } from '../carousel/carousel'
import { btn } from '../components/btn'
import { imgC } from '../components/img'
import { liComponent } from '../components/liComponent'
import { parraf } from '../components/parraf'

export const printCards = async (array, appendIn, token) => {
  appendIn.innerHTML = ''
  const newArray = [...array.result]
  if (!newArray) {
    appendIn.innerHTML = '<h3>Error</h3>'
    return
  } else if (newArray.length === 0) {
    appendIn.innerHTML = `<h3 class="no-results">There aren't result for this search</h3>`
  }
  for (let i = 0; i < newArray.length; i++) {
    const el = newArray[i]
    const article = document.createElement('article')
    const mainDivImg = document.createElement('div')
    const h3 = parraf('', el.name, 'h3', 'event-title')
    const p = parraf('Description:', el.description, 'p', 'description-parraf')
    const divInfo = document.createElement('div')
    const tema = parraf('Kind of Event:', el.tematik, 'h4', 'type-event')
    const color = colourBtn(el.tematik)
    let track
    let rightArrow
    let leftArrow

    const duration = parraf(
      'Event duration:',
      `${el.duration} hours`,
      'h4',
      'range-duration'
    )

    const price = parraf('Price:', `${el.price}€ `, 'h4', 'price-event')
    const button = btn(`btn-event-${i}`, 'Visit it here')
    button.addEventListener('click', (e) => {
      token ? routeEventDetail(el) : alertNoRegistered()
    })

    button.style.backgroundColor = color
    divInfo.style.backgroundColor = color
    article.style.backgroundColor = color

    if (el.eventPictures.length > 1) {
      track = document.createElement('ul')

      track.className = 'carousel-track'
      if (el.eventPictures.length > 1) {
        rightArrow = imgC(
          'https://res.cloudinary.com/ddybbosdk/image/upload/v1718642094/arrow-circle-left-svgrepo-com_zab7z8.svg',
          'right-arrow',
          'rotated'
        )
        leftArrow = imgC(
          'https://res.cloudinary.com/ddybbosdk/image/upload/v1718642094/arrow-circle-left-svgrepo-com_zab7z8.svg',
          'left-arrow'
        )
        leftArrow.style.display = 'none'

        mainDivImg.append(leftArrow, rightArrow)
      }
      for (let j = 0; j < el.eventPictures.length; j++) {
        const item = el.eventPictures[j]
        const liImg = liComponent()
        const img = imgC(item, '', 'pictures-event')
        if (j === 0) {
          liImg.classList.add('current-slide')
        }
        liImg.append(img)
        track.append(liImg)
      }
      mainDivImg.append(track)

      divInfo.append(tema, duration, price)
      article.append(mainDivImg, h3, p, divInfo, button)
    } else {
      const img = imgC(el.eventPictures, '', 'unique-picture')
      track = img
      mainDivImg.appendChild(img)
      mainDivImg.className = 'unique-div-img'
      divInfo.append(tema, duration, price)
      article.append(mainDivImg, h3, p, divInfo, button)
    }
    appendIn.append(article)
    setTimeout(() => {
      activeCarousel(track)
    }, 1079)

    rightArrow?.addEventListener('click', (e) => {
      clickBtn(track, 'nextElementSibling', leftArrow, rightArrow)
    })
    leftArrow?.addEventListener('click', () => {
      clickBtn(track, 'previousElementSibling', leftArrow, rightArrow)
    })
  }
}
