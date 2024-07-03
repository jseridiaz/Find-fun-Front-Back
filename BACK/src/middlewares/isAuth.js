const User = require('../api/models/usuarios')
const { validateToken } = require('../config/jwt')
const { response401, response400 } = require('../utils/response')

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token) {
      return response401(`Para hacer está acción hay que estar registrado`)
    }
    token = token.replace('Bearer ', '')

    const { id } = validateToken(token)
    console.log(id)
    const user = await User.findById(id)

    if (!user) {
      return response401('No autorizado')
    }
    const copyUser = user.toObject()
    const { password, ...restUser } = copyUser
    console.log(copyUser, restUser)
    req.user = restUser

    next()
  } catch (error) {
    return response401('You are not Autorized', res)
  }
}
const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return response401('No estás autorizado', res)
  }
  token = token.replace('Bearer ', '')
  const { id } = validateToken(token)
  const user = await User.findById(id)
  if (user.rol !== 'admin') {
    response401('No tienes autorización para hacer esto'), res
  }
  req.user = user
  user.password = null
  next()
}
module.exports = { isAuth, isAuthAdmin }
