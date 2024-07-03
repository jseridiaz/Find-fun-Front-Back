import './eventDetail.scss'
import { activeCarousel, clickBtn } from '../../modules/carousel/carousel'
import { btn } from '../../modules/components/btn'
import { divC } from '../../modules/components/div'
import { formC } from '../../modules/components/formC'
import { imgC } from '../../modules/components/img'
import { getLocal } from '../../modules/components/localStorage'
import { parraf } from '../../modules/components/parraf'
import { sectionContainer } from '../../modules/components/section'
import { selectFilter } from '../../modules/components/selectFilter'
import { fetchBackAttendes } from '../../modules/fetch/sesionPage/fetchBack'
import { readMain } from '../../modules/functions/readMain'
import { findParticipant } from './findParticipant'

export const eventDetail = async (el) => {
  const attendee = await fetchBackAttendes(`attendees/idUser/${getLocal('id')}`)
  const eventsPlanned = await fetchBackAttendes(`eventsplaned/${el._id}`)
  const allCities = await fetchBackAttendes(`eventsplaned/allcities/${el._id}`)
  setTimeout(() => {
    console.log(allCities)
  }, 1000)
  const main = readMain()

  main.innerHTML = ''

  const section = sectionContainer(
    'section-event-planned',
    'flex-container',
    'section'
  )
  const divInfo = divC('event-selected', 'flex-container')
  const info = divC('flex-container', 'info-event')
  const duration = parraf('Duration:', `${el.duration} hours`, 'p')
  const thematik = parraf('Thematik:', `${el.tematik}`, 'p')
  const price = parraf('Price:', `${el.price}€`, 'p')
  const divOptionen = divC('events-options flex-container', '')
  const h3 = parraf(`Join to the next '${el.name}'`, '', 'h3')
  const mainDivImg = divC('container-main-img')
  const ul = sectionContainer('carousel-details-track', '', 'ul')
  const form = formC('filter-events-planned')
  const divCities = divC('flex-container', 'filter-cities')
  const sectionCards = sectionContainer(
    'section-articles',
    'flex-container',
    'section'
  )
  const h4 = parraf('Filter by Cities:', '', 'h4')
  const select = selectFilter('cities', allCities)
  const btnToFilter = btn('btn-cities', 'Search')

  divCities.append(h4, select, btnToFilter)
  form.append(divCities)
  let rightArrow
  let leftArrow
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const results =
      select.value !== 'all'
        ? await fetchBackAttendes(`eventsplaned/city/${select.value}`)
        : await fetchBackAttendes(`eventsplaned/${el._id}`)
    sectionCards.innerHTML = ''
    printCard(results)
  })
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
    for (let i = 0; i < el.eventPictures.length; i++) {
      const item = el.eventPictures[i]
      const divImg = sectionContainer('', 'div-picture', 'li')
      const img = imgC(item, '', 'single-picture')

      if (i == 0) {
        divImg.classList.add('current-slide')
      }

      divImg.classList.add('container-img')
      divImg.append(img)
      ul.append(divImg)
    }

    mainDivImg.append(leftArrow, rightArrow)
  } else {
    const img = imgC(el.eventPictures[0], '', 'single-picture')
    ul.append(img)
  }
  const fullDesciption = parraf(el.description, '', 'h4')
  function printCard(array) {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]

      const container = sectionContainer(
        '',
        'single-event-planned grid-container',
        'article'
      )
      const city = parraf('City', item.city, 'p')

      const adresse = parraf('Start adresse: ', item.adresse, 'p')
      container.append(city, adresse)

      const attendees = parraf(``, '', 'p')
      attendees.innerHTML = '<strong>Attendees:</strong> '
      const totalAttendees = parraf(
        'Total attendees:',
        `${item.participants.length}`,
        'p'
      )
      if (item.participants.length > 0) {
        for (let j = 0; j < item.participants.length; j++) {
          const each = item.participants[j]
          if (j === item.participants.length - 1) {
            attendees.innerHTML += `${each.name} ${each.surname}`
          } else {
            attendees.innerHTML += `${each.name} ${each.surname}, `
          }
        }
      } else {
        attendees.innerHTML += 'Join first!'
      }
      container.append(attendees, totalAttendees)
      sectionCards.append(container)

      const newDate = new Date(item.date)
      const startDate = parraf(
        'Date:',
        `${newDate.getDate()}/${
          newDate.getMonth() + 1
        }/${newDate.getFullYear()}`,
        'p'
      )

      const button = item.participants.find((el) => el._id === attendee?._id)
        ? btn('', 'Joined', 'button', 'selected')
        : btn('', 'Join in', 'button', '')

      button.addEventListener('click', async () => {
        findParticipant(item._id, button, attendee, main, () => {
          eventDetail(el)
        })
      })
      container.append(startDate, button)
      sectionCards.append(container)
      divOptionen.insertAdjacentElement('afterbegin', form)
      divOptionen.insertAdjacentElement('afterbegin', h3)
      divOptionen.append(sectionCards)
    }
  }

  printCard(eventsPlanned)
  info.append(duration, thematik, price)
  mainDivImg.append(fullDesciption, ul)
  divInfo.append(mainDivImg, info)
  section.append(divInfo, divOptionen)
  main.append(section)
  if (eventsPlanned.length == 0) {
    divOptionen.innerHTML = `<h3> There aren't yet planned Events.</h3>`
  }
  if (el.eventPictures.length > 1) {
    activeCarousel(ul)
    rightArrow?.addEventListener('click', () => {
      clickBtn(ul, 'nextElementSibling', leftArrow, rightArrow)
    })
    leftArrow?.addEventListener('click', () => {
      clickBtn(ul, 'previousElementSibling', leftArrow, rightArrow)
    })
  }
}
