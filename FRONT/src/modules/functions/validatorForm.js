import { infoFormatPassword } from '../../data/alert/msnForm'
import { arrayExtensions } from '../../data/validatorExtension/arrayExtensions'

export const validatePassword = (e, input, msnInfo) => {
  let error = false
  const regex = new RegExp(
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#_?!@$ .,%^&*-])'
  )
  if (!regex.test(input.value)) {
    msnInfo.textContent = infoFormatPassword
    input.classList.remove('success')
    msnInfo.classList.remove('success')
    error = true
  } else {
    msnInfo.textContent =
      e.type === 'submit'
        ? 'User has been registered'
        : 'The password is correct'
    input.classList.add('success')
    msnInfo.classList.add('success')
  }
  return error
}
export const validateEmail = (email, msnInfo) => {
  let error = false
  let firstCondition = ''
  let secondCondition = ''
  let thirdCondition = ''
  const { value } = email

  const extension = value.substring(value.lastIndexOf('.'))

  if (value.indexOf('@') == -1) {
    error = true
    firstCondition = 'Email must contain a "@"'
  }
  if (value.lastIndexOf('.') < value.indexOf('@')) {
    secondCondition = ' "@" must be placed before "."'
    error = true
  }
  if (!arrayExtensions.includes(extension)) {
    thirdCondition =
      'The email must contain an accepted extension: .com, .es, .net, ...'
    error = true
  }
  if (error === true) {
    email.style.outline = '2px solid crimson'
    msnInfo.classList.remove('success')
    msnInfo.textContent = `${
      firstCondition ? '| ' + firstCondition + ' |' : ''
    }${secondCondition ? '| ' + secondCondition + ' |' : ''}${
      thirdCondition ? '| ' + thirdCondition + ' |' : ''
    }`
  } else {
    email.style.outline = '2px solid #adff2f'
    msnInfo.classList.add('success')
  }

  return error
}
