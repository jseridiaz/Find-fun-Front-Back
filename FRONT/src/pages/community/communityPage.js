import './community.scss'
import { sectionContainer } from '../../modules/components/section'
import { formC } from '../../modules/components/formC'
import { btn } from '../../modules/components/btn'
import { fetchBackAttendes } from '../../modules/fetch/sesionPage/fetchBack'
import { printCardsCommunity } from './printCards'
import { labelInput } from '../../modules/components/labelInput'
import { generalFetch } from '../../modules/fetch/eventPlanned/generalFetch'
import { imgC } from '../../modules/components/img'
import { readMain } from '../../modules/functions/readMain'

export const communityPage = async () => {
  const arrayPeople = await fetchBackAttendes('attendees/events')
  const main = readMain()

  const section = sectionContainer(
    'attendes-container',
    'flex-container',
    'section'
  )

  main.className = ''
  main.classList.add('community-main', 'flex-container')
  main.innerHTML = ''
  const filter = formC('filter-category', 'flex-container')

  const inputName = labelInput(
    'Search Attendees by name:',
    'filter-name-attendee',
    '',
    'input'
  )

  const button = btn('submit-attendes-filter', 'Look for')
  const resetBtn = btn('reset-community', '', 'reset')
  const imgReset = imgC(
    'https://res.cloudinary.com/ddybbosdk/image/upload/v1719478224/reiniciar_dbnes6.png'
  )
  resetBtn.append(imgReset)
  filter.append(inputName, button, resetBtn)

  filter.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      if (inputName.value === '') {
        printCardsCommunity(arrayPeople, main)
      } else {
        const arrayFiltered = await generalFetch(
          `attendees/name?name=${inputName.value}`
        )
        inputName.value = ''
        printCardsCommunity(arrayFiltered.result, main)
      }
    } catch (error) {
      throw new Error('error' + error)
    }
  })
  resetBtn.addEventListener('click', () => {
    printCardsCommunity(arrayPeople, main)
  })
  section.append(filter)
  main.append(section)
  printCardsCommunity(arrayPeople, main)
}
