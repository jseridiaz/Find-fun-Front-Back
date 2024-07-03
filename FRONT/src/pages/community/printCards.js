import { divC } from '../../modules/components/div'
import { imgC } from '../../modules/components/img'
import { parraf } from '../../modules/components/parraf'
import { sectionContainer } from '../../modules/components/section'
import { generalFetch } from '../../modules/fetch/eventPlanned/generalFetch'
import { routerParticipant } from '../../routes/routeCommunity'
import { takePicture } from './functionTakePicture'

export const printCardsCommunity = (array, insertIn) => {
  const sectionCards =
    document.querySelector('#attendees-section') ??
    sectionContainer('attendees-section', 'flex-container', 'section')
  sectionCards.innerHTML = ''

  if (!array.length) {
    sectionCards.innerHTML += `<p class="error">There isn't valid results with this name.
    </p><p class="error">Try it again with another name</p> `
    return
  }
  for (let i = 0; i < array.length; i++) {
    const el = array[i]
    const article = sectionContainer(
      '',
      'flex-container-column single-attendee',
      'article'
    )
    const divImg = divC('container-img')
    const img = imgC(
      el.avatar
        ? el.avatar
        : 'https://cdn-icons-png.flaticon.com/256/12225/12225773.png'
    )
    const divInfo = divC('info-div-attendee')
    const h3 = parraf(`${el.name} ${el.surname}`, '', 'h3')
    let eventsName = parraf('Participate in:', ``, 'h4', 'events-to-assist')

    const newArray = takePicture(el.registeredEvents)

    divImg.append(img)
    divInfo.append(h3)
    eventsName.innerHTML += newArray.join(',')
    divInfo.append(eventsName)
    article.append(divImg, divInfo)
    sectionCards.append(article)

    article.addEventListener('click', async () => {
      const Attendee = await generalFetch(`attendees/${el._id}`)
      const arrayAttendee = [Attendee.result]
      const contact = parraf('Email:', el.email, 'h4')

      printCardsCommunity(arrayAttendee, insertIn)
      const article = document.querySelector('.single-attendee')
      article.classList.add('unique-attendee')
      const newArray = takePicture(el.registeredEvents)
      const description = parraf('About me:', el.description, 'h4')
      document.querySelector('.events-to-assist').innerHTML +=
        newArray.join(',')
      const infoDiv = document.querySelector('.info-div-attendee')
      infoDiv.append(contact, description)
      article.style.pointerEvents = 'none'
      routerParticipant(el._id)
    })
  }

  insertIn.append(sectionCards)
}
