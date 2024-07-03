const mongoose = require('mongoose')

const ParticipantesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    idUser: {
      type: mongoose.Types.ObjectId,
      ref: 'userEvents',
      required: true
    },
    surname: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    registeredEvents: [
      { type: mongoose.Types.ObjectId, ref: 'EventsPlaned', trim: true }
    ]
  },
  { timestamps: true, collection: 'participantes' }
)

const Participante = mongoose.model(
  'participantes',
  ParticipantesSchema,
  'participantes'
)
module.exports = Participante
