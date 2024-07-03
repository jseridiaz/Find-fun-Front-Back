const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO)
    console.log('Conectado a la BBDD Mongo')
  } catch (error) {
    console.error(error)
  }
}

module.exports = { connectDb }
