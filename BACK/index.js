require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { connectDb } = require('./src/config/db')
const mainRouter = require('./src/api/routes/mainRoute')
const { configCDY } = require('./src/config/cloudinary')

const app = express()
app.use(cors())
app.use(express.json())

connectDb()
configCDY()

app.use('/', mainRouter)
app.use('*', (req, res, next) => res.status(400).json('Route not found'))

app.listen(process.env.PORT, () => {
  console.log('Connected to http://localhost:' + process.env.PORT)
})
