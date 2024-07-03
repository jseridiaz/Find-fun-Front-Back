import { infoFormatPassword } from '../../data/alert/msnForm'

export const form = (id, className = '', h2, parraf, button) => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = ''
  form.id = id
  form.className = className
  form.innerHTML = `
      <h2>${h2}</h2>
      <p>${parraf}</p>
      <div><label for="input-email">Email</label><input type="text" id="input-email" required autocomplete="true" ></div>
      <div ><label for="password-input">Password</label><input type="password" id="password-input" required ${
        id == 'register-form' ? "minlength='8'" : ''
      }><p id="message-login" class="${
    id == 'register-form' ? 'success' : 'no-visibility'
  }">${id == 'register-form' ? infoFormatPassword : ''} </p></div>
       <button id="${id}-button" type="submit">${button}</button><p id="parraf-to-register">Aren't you yet registered?. <a href="" class="click-to-page"><u>Click here</u> </a></p>
    `

  return form
}
