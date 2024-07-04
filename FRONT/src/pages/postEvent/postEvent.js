import './postEvent.scss'
import { btn } from '../../modules/components/btn'
import { divC } from '../../modules/components/div'
import { formC } from '../../modules/components/formC'
import { imgC } from '../../modules/components/img'
import { labelInput } from '../../modules/components/labelInput'
import { getLocal } from '../../modules/components/localStorage'
import { parraf } from '../../modules/components/parraf'
import { sectionContainer } from '../../modules/components/section'
import { selectFilter } from '../../modules/components/selectFilter'
import { readMain } from '../../modules/functions/readMain'
import { activeLoader } from '../../modules/animation/loader/loader'
import { setAttributeTo } from '../../modules/functions/setAttribute'
export const postEvent = () => {
  const main = readMain()
  main.innerHTML = ''
  main.className = 'sesion-main-page flex-container'

  const section = sectionContainer(
    'section-post-event',
    'flex-container margin-xl',
    'section'
  )

  const form = formC('form-post-event', 'flex-container-column')
  const h2 = parraf('Create your event and post it', '', 'h2')
  const divName = divC('flex-container')
  const divTematik = divC('flex-container')
  const divEventPictures = divC('flex-container')
  const divDuration = divC('flex-container')
  const divDescription = divC('flex-container')
  const divPrice = divC('flex-container')
  const divBtn = divC('flex-container btn-div')
  const errSpan = parraf('', '', 'span', 'err-msn')
  const parrafPosted = parraf(
    'The Event was posted successfully',
    '',
    'p',
    'success no-visibility'
  )
  const inputName = labelInput(
    'Name of the event:',
    'name-post-event',
    '',
    'input',
    true
  )
  setAttributeTo(inputName, 'maxlength', '50')
  const inputDuration = labelInput(
    'Duration time:',
    'duration-post-event',
    '',
    'input',
    true,
    'number'
  )
  setAttributeTo(inputDuration, 'max', '48')
  const inputDescription = labelInput(
    'Event description:',
    'description-event',
    '',
    'input',
    true
  )
  setAttributeTo(inputDescription, 'maxlength', '150')
  const inputPrice = labelInput(
    'Event Price:',
    'price-event',
    '',
    'input',
    true,
    'number'
  )
  setAttributeTo(inputPrice, 'max', '999')
  const parrafTema = parraf('', 'Select Thema:', 'p')
  const inputTematik = selectFilter('event name', [
    'Party',
    'Trainings',
    'Tour',
    'Humor',
    'Fan',
    'Sport'
  ])
  inputTematik.setAttribute('required', 'true')
  const inputPicture = labelInput(
    'Event Pictures:',
    'post-event-pictures',
    '',
    'input',
    true,
    'file'
  )

  inputPicture.setAttribute('multiple', true)
  const btnToPost = btn('btn-post-event', 'Post it')
  const resetBtn = btn('', '', 'reset')
  const imgReset = imgC(
    'https://res.cloudinary.com/ddybbosdk/image/upload/v1719478224/reiniciar_dbnes6.png'
  )
  const loader = activeLoader('loader-post')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const [name, price, thema, duration, description, pictures] = e.target
    if (!parrafPosted.classList.contains('no-visibility')) {
      parrafPosted.classList.add('no-visibility')
    }
    if (inputTematik.value == 'all') {
      inputTematik.style.outline = '2px solid crimson'
      return
    }
    if (pictures.files.length > 5) {
      errSpan.textContent = "More as 5 files can't be sended"
      divEventPictures.classList.add('error')
      return
    } else {
      divEventPictures.classList.remove('error')
      errSpan.textContent = ''
    }
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('price', price.value)
    formData.append('tematik', thema.value)
    formData.append('duration', duration.value)
    formData.append('description', description.value)
    for (let i = 0; i < pictures.files.length; i++) {
      let el = pictures.files[i]
      formData.append('eventPictures', el)
    }
    form.appendChild(loader)
    const response = await fetch(`${import.meta.env.VITE_BACK}/api/events`, {
      method: 'POST',
      headers: {
        Authorization: getLocal('token')
      },
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result) {
          parrafPosted.classList.remove('no-visibility')
          loader.remove()
        } else {
          errSpan.textContent = res.message
          loader.remove()
        }
      })
  })
  resetBtn.addEventListener('click', () => {
    inputTematik.style.outline = 'none'
  })
  resetBtn.append(imgReset)
  divName.append(inputName)
  divTematik.append(parrafTema, inputTematik)
  divPrice.append(inputPrice)
  divDescription.append(inputDescription)
  divEventPictures.append(inputPicture)
  divDuration.append(inputDuration)
  divBtn.append(btnToPost, resetBtn)
  form.append(
    h2,
    divName,
    divPrice,
    divTematik,
    divDuration,
    divDescription,
    divEventPictures,
    errSpan,
    divBtn,
    parrafPosted
  )
  section.append(form)
  main.append(section)
}
