const jwt = require('jsonwebtoken')
const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1d' })

const validateToken = (token) => jwt.verify(token, process.env.SECRET_KEY)

module.exports = { generateToken, validateToken }
