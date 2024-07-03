const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, trim: true, required: true },
    rol: {
      type: String,
      trim: true,
      default: 'user',
      required: true,
      enum: ['admin', 'user']
    }
  },
  { timestamps: true, collection: 'userEvents' }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('userEvents', userSchema, 'userEvents')

module.exports = User
