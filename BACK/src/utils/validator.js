const { response400 } = require('./response')

const validatorEmail = (email, res) => {
  const commonEmailExtensions = [
    '.com',
    '.net',
    '.org',
    '.edu',
    '.gov',
    '.mil',
    '.info',
    '.biz',
    '.name',
    '.pro',
    '.ae',
    '.au',
    '.ca',
    '.co',
    '.de',
    '.fr',
    '.in',
    '.it',
    '.jp',
    '.uk',
    '.mx',
    '.es',
    '.cn',
    '.tv',
    '.io',
    '.xyz',
    '.sh',
    '.ac',
    '.be',
    '.ch',
    '.cz',
    '.dk',
    '.ee',
    '.fi',
    '.gr',
    '.hk',
    '.hu',
    '.id',
    '.il',
    '.is',
    '.kr',
    '.lt',
    '.lu',
    '.lv',
    '.nl',
    '.no',
    '.nz',
    '.pl',
    '.pt',
    '.ro',
    '.se',
    '.sg',
    '.sk',
    '.sn',
    '.th',
    '.tw',
    '.za'
  ]
  const extension = email.substring(email.lastIndexOf('.'))
  let result = true
  let firstCondition = ''
  let secondCondition = ''

  let thirdCondition = ''

  if (email.indexOf('@') == -1) {
    result = false
    firstCondition = 'Email must contain a "@"'
  }
  if (email.lastIndexOf('.') < email.indexOf('@')) {
    secondCondition = ' "@" must be placed before "."'
    result = false
  }
  if (!commonEmailExtensions.includes(extension)) {
    thirdCondition =
      'The email must contain an accepted extension: .com, .es, .net, ...'
    result = false
  }
  if (result === false) {
    return response400(
      `${firstCondition ? '| ' + firstCondition + ' |' : ''}${
        secondCondition ? '| ' + secondCondition + ' |' : ''
      }${thirdCondition ? '| ' + thirdCondition + ' |' : ''}`,
      res
    )
  }
}
const validatorPassword = (pass, res) => {
  let regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@_.$!%*?&]{8,}$/

  if (!regex.test(pass)) {
    return response400(
      'The password must contain an uppercase word, a number, a special character "@$!%*.?&" and unless 8 characters.....',
      res
    )
  }
}
module.exports = { validatorEmail, validatorPassword }
