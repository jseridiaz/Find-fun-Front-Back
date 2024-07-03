import './profilPage.scss'
import { getLocal } from '../../modules/components/localStorage'
import { parraf } from '../../modules/components/parraf'
import { sectionContainer } from '../../modules/components/section'
import { generalFetch } from '../../modules/fetch/eventPlanned/generalFetch'
import { formC } from '../../modules/components/formC'
import { labelInput } from '../../modules/components/labelInput'
import { divC } from '../../modules/components/div'
import { btn } from '../../modules/components/btn'
import { fetchProfil } from '../../modules/fetch/createProfil/fetchProfil'
import { fetchProfilUpdate } from '../../modules/fetch/createProfil/fetchProfilUpdate'
import { activeLoader } from '../../modules/animation/loader/loader'
import { readMain } from '../../modules/functions/readMain'
import { setAttributeTo } from '../../modules/functions/setAttribute'

export const profilPage = async () => {
  const main = readMain()
  main.innerHTML = ''
  main.className = 'sesion-main-page profil-main flex-container'
  const sectionProfil = sectionContainer(
    'section-create-profil',
    'flex-container',
    'section'
  )

  const yourProfil = await generalFetch(`attendees/idUser/${getLocal('id')}`)
  const form = formular(yourProfil, main)

  const profil = sectionContainer(
    'article-profile-info',
    'flex-container-column',
    'article'
  )
  profil.innerHTML += `<h2 id="title-profil">Your Profil</h2>`
  if (yourProfil.result) {
    for (const key in yourProfil.result) {
      if (
        key == 'registeredEvents' ||
        key == '__v' ||
        key == 'idUser' ||
        key == 'updatedAt' ||
        key == 'avatar'
      ) {
        continue
      } else if (key == 'createdAt') {
        const el = yourProfil.result[key]
        const date = new Date(el)

        const titleProfil = parraf(
          `Created at: `,
          `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          'h4'
        )

        profil.append(titleProfil)
      } else {
        const el = yourProfil.result[key]

        const titleProfil = parraf(`${key}: `, el, 'h4')

        profil.append(titleProfil)
      }
    }
    sectionProfil.append(profil)
    main.append(sectionProfil, form)
  } else {
    profil.innerHTML = `<p class="parraf-no-profil">Your dont't have yet a profil. </p><p class="parraf-no-profil">Create it to be able to join in Events</p>`
    sectionProfil.append(profil)
    main.append(sectionProfil, form)
  }
}
export const formular = (profil, appendIn) => {
  const form = formC('create-profil-page', 'flex-container-column')
  const nameInput = labelInput(
    'Write your name',
    'name-profil',
    'Name',
    'input',
    true
  )
  setAttributeTo(nameInput, 'maxwidtht', '20')
  nameInput.setAttribute('maxlength', '20')
  const surnameInput = labelInput(
    'Write your surname',
    'surname-profil',
    'Surname',
    'input',
    true
  )
  setAttributeTo(surnameInput, 'maxwidtht', '20')
  const descriptionInput = labelInput(
    'About you',
    'about-me-profile',
    'Describe yourself',
    'textarea',
    true
  )
  descriptionInput.setAttribute('maxlength', '150')
  const avatarInput = labelInput(
    'Choose your Avatar',
    'your-avatar-input',
    '',
    'input',
    false,
    'file'
  )
  const parrafMsn = parraf('', '', 'span', 'absolute')
  const h3 = !profil.result
    ? parraf('Create your Profil', '', 'h3')
    : parraf('Update your profil', '', 'h3')
  const divName = divC('flex-container', 'input-profil-name')
  const divSurname = divC('flex-container', 'input-profil-surname')
  const divAboutMe = divC('flex-container', 'input-profil-about')
  const divAvatar = divC('flex-container', 'input-profil.avatar')
  const button = btn('send-profil', !profil.result ? 'Create Profil' : 'Update')
  divName.append(nameInput)
  divSurname.append(surnameInput)
  divAboutMe.append(descriptionInput)
  divAvatar.append(avatarInput)

  descriptionInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
      descriptionInput.style.backgroundColor = 'beige'
    } else {
      descriptionInput.style.backgroundColor = 'white'
    }
  })
  form.append(h3, divName, divSurname, divAboutMe, divAvatar, button, parrafMsn)
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (descriptionInput.value.length == 0) {
      parrafMsn.textContent = "'You must fill in about you field'"
      parrafMsn.classList.add('crimson')
      return
    } else {
      parrafMsn.textContent = ''
      parrafMsn.classList.remove('crimson')
    }
    const [name, surname, description, avatar] = e.target

    !profil.result
      ? await fetchProfil(
          name.value,
          surname.value,
          description.value,
          avatar.files[0]
        )
      : await fetchProfilUpdate(
          profil.result._id,
          name.value,
          surname.value,
          description.value,
          avatar.files[0]
        )
    const loader = activeLoader('loader-profil')
    appendIn.append(loader)
    setTimeout(() => {
      loader.remove()
      profilPage()
    }, 2000)
  })
  return form
}
