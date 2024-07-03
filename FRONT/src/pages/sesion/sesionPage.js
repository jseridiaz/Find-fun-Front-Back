import './sesionPage.scss'
import { allThemas } from '../../data/allThemas/allThemas'
import { liEventsPlanned } from '../../data/header/liList'
import { formC } from '../../modules/components/formC'
import { btn } from '../../modules/components/btn'
import { divC } from '../../modules/components/div'
import { selectFilter } from '../../modules/components/selectFilter'
import { fetchBack } from '../../modules/fetch/sesionPage/fetchBack'
import { newHeader } from '../../modules/newHeader/newHeader'
import { parraf } from '../../modules/components/parraf'
import { showLetter } from '../../modules/animation/showLetter/showLetter'
import { imgC } from '../../modules/components/img'
import { sectionContainer } from '../../modules/components/section'
import { getLocal } from '../../modules/components/localStorage'
import { activeCarousel } from '../../modules/carousel/carousel'
import { readMain } from '../../modules/functions/readMain'
import { fetchPictures } from '../../modules/fetch/mainPage/fetchPictures'

const getPictureSesionOne = async (id) =>
  await fetchPictures(id, '1080', '700s', 'regular')

export const sesionLoged = async (mainSelect = null) => {
  const pictureOne = await getPictureSesionOne('x9I-6yoXrXE')
  const pictureTwo = await getPictureSesionOne('rE9vgD_TXgM')

  const token = getLocal('token')
  const arrayLi = liEventsPlanned(token)
  const sectionCard = sectionContainer(
    'all-events',
    'flex-container',
    'section'
  )
  await fetchBack('events', sectionCard, token)
  const backgroundOne = imgC(pictureOne, 'background-one', 'portrait-session')
  const backgroundTwo = imgC(pictureTwo, 'background-two', 'portrait-session')
  const welcome = document.createElement('p')
  const h2 = document.createElement('h2')
  welcome.id = 'greating-user'
  h2.textContent =
    'Find out here the newest events that the community has posted'
  h2.id = 'title-sesion'

  !mainSelect ? (mainSelect = readMain()) : (mainSelect = mainSelect)

  const signal = imgC(
    'https://res.cloudinary.com/ddybbosdk/image/upload/v1718962270/arrow_tsbg6t.webp',
    'arrow-signer',
    'arrow-self'
  )

  newHeader(
    arrayLi,
    mainSelect,
    token ? 'sesion-header' : 'sesion-header no-register'
  )
  mainSelect.innerHTML = ''
  mainSelect.className = token
    ? 'sesion-main-page'
    : 'sesion-main-page no-register'
  mainSelect.classList.add('flex-container')
  const filterName = formC('filter-name', 'flex-container absolute')
  filterName.method = 'GET'
  const h3FilterName = parraf('Look for name:', '', 'h3')
  const inputName = document.createElement('input')
  inputName.type = 'search'
  const btnName = btn('btn-filter-name', 'search')

  filterName.append(h3FilterName, inputName, btnName)

  const filterCont = formC('filter-event', 'flex-container-column')
  const h3 = parraf('Filters', '', 'h3')
  const themaFilterContainer = divC('flex-container-column', 'thema-filter')
  const titleThemaFilter = parraf('Filter by Thema', '', 'h4')
  const themaSelect = selectFilter('Thema', allThemas)
  const priceFilterContainer = divC('flex-container-column', 'price-filter')
  const titlePriceFilter = parraf('Filter by Price', '', 'h4')
  const priceInput = document.createElement('input')
  const btnSendForm = btn('btn-send-filters', 'Search', 'submit')
  const btnReset = btn('btn-reset-filter', 'Clear', 'reset')
  const durationFilterContainer = divC(
    'flex-container-column',
    'duration-filter'
  )
  const titleDurationFilter = parraf('Filter by duration', '', 'h4')
  const durationInput = document.createElement('input')
  themaSelect[0].value = ''
  themaFilterContainer.append(titleThemaFilter, themaSelect)
  priceInput.type = 'number'
  priceFilterContainer.append(titlePriceFilter, priceInput)

  filterCont.append(
    h3,
    themaFilterContainer,
    priceFilterContainer,
    durationFilterContainer,
    btnSendForm,
    btnReset
  )

  mainSelect.append(
    backgroundOne,
    backgroundTwo,
    signal,
    filterCont,
    filterName,
    welcome,
    h2,
    sectionCard
  )
  durationFilterContainer.append(titleDurationFilter, durationInput)
  filterName.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetchBack(`events/search?name=${inputName.value}`, sectionCard, token)
  })

  filterCont.addEventListener('submit', async (e) => {
    e.preventDefault()
    const thema = e.target[0].value
    const price = parseFloat(e.target[1].value)
    const duration = parseInt(e.target[2].value)

    if (thema && price && duration) {
      await fetchBack(
        `events/filters?tematik=${thema}&price=${price}&duration=${duration}`,
        sectionCard,
        token
      )
    } else if (thema && price) {
      await fetchBack(
        `events/filters?tematik=${thema}&price=${price}`,
        sectionCard,
        token
      )
    } else if (thema && duration) {
      await fetchBack(
        `events/filters?tematik=${thema}&duration=${duration}`,
        sectionCard,
        token
      )
    } else if (!thema && price && duration) {
      await fetchBack(
        `events/filters?price=${price}&duration=${duration}`,
        sectionCard,
        token
      )
    } else if (thema && !price && !duration) {
      await fetchBack(`events/filters?tematik=${thema}`, sectionCard, token)
    } else if (!thema && price && !duration) {
      await fetchBack(`events/price/${price}`, sectionCard, token)
    } else if (!thema && !price && duration) {
      await fetchBack(`events/filters?duration=${duration}`, sectionCard, token)
    } else if (!thema) {
      await fetchBack('events', sectionCard, token)
    }
  })

  btnReset.addEventListener('click', async () => {
    await fetchBack('events', sectionCard, token)
  })

  showLetter(
    `Hi ${
      getLocal('user')?.includes('@')
        ? getLocal('user').slice(0, getLocal('user').indexOf('@'))
        : getLocal('user')
    }!`,
    '#greating-user'
  )
  document.querySelectorAll('#carousel-track').forEach((el) => {
    activeCarousel(el)
  })
}
