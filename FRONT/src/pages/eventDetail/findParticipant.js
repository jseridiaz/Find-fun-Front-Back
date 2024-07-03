import { activeLoader } from '../../modules/animation/loader/loader'
import { btn } from '../../modules/components/btn'
import { divC } from '../../modules/components/div'
import { formC } from '../../modules/components/formC'
import { labelInput } from '../../modules/components/labelInput'
import { getLocal } from '../../modules/components/localStorage'
import { parraf } from '../../modules/components/parraf'
import { fetchProfil } from '../../modules/fetch/createProfil/fetchProfil'
import { fetchJoin } from '../../modules/fetch/eventPlanned/fetchjoin'
import { generalFetch } from '../../modules/fetch/eventPlanned/generalFetch'
import { fetchBackAttendes } from '../../modules/fetch/sesionPage/fetchBack'
import { changeNummerAttendees } from '../../modules/functions/changeNummerAttendees'
import { closeDiv } from '../../modules/functions/closeDiv'

export const findParticipant = async (
  eventID,
  buttonToChange,
  participant,
  insertIn,
  callBackFunction
) => {
  const profil = await fetchBackAttendes(`attendees/idUser/${getLocal('id')}`)
  const idAttendee = profil?._id

  const loader = activeLoader('loader-create-profil')
  const nameInput = labelInput(
    'Write your name',
    'name-profil',
    'Name',
    'input',
    true
  )
  const surnameInput = labelInput(
    'Write your surname',
    'surname-profil',
    'Surname',
    'input',
    true
  )
  const descriptionInput = labelInput(
    'About yourself',
    'surname-profil',
    'What are you interested for?',
    'textarea',
    false
  )

  if (!profil) {
    insertIn.append(loader)
    const form = formC('create-profil', 'flex-container-column absolute')
    const h3 = parraf('Create your Profil', '', 'h3')
    const closeBtn = btn('close-form', 'X')
    const divName = divC('', 'input-profil-name')
    const divSurname = divC('', 'input-profil-surname')
    const divAboutMe = divC('', 'input-profil-about')

    const button = btn('send-profil', 'Create Profil')

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      await fetchProfil(
        nameInput.value,
        surnameInput.value,
        descriptionInput.value
      )
        .then((res) => res.json())
        .then((res) => {
          const textContainer = divC('absolute', 'advice-container')
          const textAdvice = parraf(`${res.message}.`, '', 'p')
          const nameProfil = parraf(
            `${res.result.name} ${res.result.surname}`,
            '',
            'p'
          )
          const btnClose = closeBtn
          btnClose.textContent = 'Join in now'
          textContainer.append(textAdvice, nameProfil, btnClose)
          btnClose.classList.add('close-register-profil')
          insertIn.append(textContainer)
          form.remove()
          closeDiv(btnClose, textContainer)
          btnClose.addEventListener('click', callBackFunction)
        })
    })

    divName.append(nameInput)
    divSurname.append(surnameInput)
    divAboutMe.append(descriptionInput)
    form.append(h3, divName, divSurname, divAboutMe, button, closeBtn)
    loader.remove()
    insertIn.append(form)
    closeDiv(closeBtn, form)
  } else {
    if (!buttonToChange.classList.contains('selected')) {
      const idParticipant = await fetchJoin(
        `attendees/${eventID}`,
        participant._id
      ).then((res) => res.json())

      insertIn.append(loader)
      buttonToChange.textContent = 'Joined'
      buttonToChange.classList.toggle('selected')

      buttonToChange.parentElement.childNodes[2].textContent.includes(
        'Join first!'
      )
        ? (buttonToChange.parentElement.childNodes[2].innerHTML = `<strong>Attendees:</strong> ${participant.name} ${participant.surname}`)
        : (buttonToChange.parentElement.childNodes[2].innerHTML += `, ${participant.name} ${participant.surname}`)
      changeNummerAttendees(buttonToChange.parentElement.childNodes[3], true)
      loader.remove()

      alert('registered')
    } else {
      const deleteAsistance = await generalFetch(
        `user/attendees/eventRegistered/${eventID}`,
        'PUT'
      )
      buttonToChange.parentElement.childNodes[2].innerHTML =
        !buttonToChange.parentElement.childNodes[2].textContent.includes(',')
          ? buttonToChange.parentElement.childNodes[2].innerHTML.replace(
              `${participant.name} ${participant.surname}`,
              'Join first!'
            )
          : buttonToChange.parentElement.childNodes[2].innerHTML.replace(
              `, ${participant.name} ${participant.surname}`,
              ''
            )
      changeNummerAttendees(buttonToChange.parentElement.childNodes[3], false)

      buttonToChange.textContent = 'Join in'
      buttonToChange.classList.toggle('selected')
      alert('unregistered')
    }
  }
}
