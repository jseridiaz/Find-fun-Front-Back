const { isAuth } = require('../../middlewares/isAuth')
const {
  getAllUsers,
  register,
  login,
  deleteUser
} = require('../controllers/usuarios')

const userRouter = require('express').Router()

userRouter.get('/', getAllUsers)
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.delete('/delete/:id', deleteUser)

module.exports = userRouter
