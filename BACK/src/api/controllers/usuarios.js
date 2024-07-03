const { generateToken } = require('../../config/jwt')
const {
  response400,
  response200,
  response201,
  response401
} = require('../../utils/response')
const { validatorEmail, validatorPassword } = require('../../utils/validator')
const User = require('../models/usuarios')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()

    return response200(
      allUsers,
      `Esto son los ${allUsers.length} Usuarios registrados`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    validatorEmail(email, res)
    validatorPassword(password, res)
    const emailRes = await User.findOne({ email })
    if (emailRes) {
      return response400('Este usuario está ya registrado', res)
    }
    const newUser = new User(req.body)
    newUser.rol = 'user'
    const newUserSaved = await newUser.save()
    return response201(newUserSaved, 'Usuario registrado correctamente', res)
  } catch (error) {
    return res.status(400).json('Error')
  }
}
const login = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return response401('El usuario o la contraseña no es correcto', res)
    }
    if (bcrypt.compareSync(password, userFound.password)) {
      const token = generateToken(userFound._id)

      return response200(
        { userFound, token },
        'User is loged successfuly ',
        res
      )
    } else {
      return response401('User or password is incorrect', res)
    }
  } catch (error) {
    return response400(error, res)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    // if (id != req.user._id) {
    //   return response401('Usuario no autorizado', res)
    // }
    const user = await User.findByIdAndDelete(id)

    return response200(user, 'Usuario correctamente eliminado', res)
  } catch (error) {
    return response400(error, res)
  }
}
module.exports = { getAllUsers, register, login, deleteUser }
