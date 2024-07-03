const mongoose = require('mongoose')
const eventsPlanedSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
      trim: true
    },
    numberParticipants: { type: Number },
    participants: { type: [mongoose.Types.ObjectId], ref: 'participantes' },
    date: {
      type: Date,
      trim: true,
      required: true
    },
    city: { type: String, trim: true, required: true },
    adresse: { type: String, trim: true, required: true }
  },
  { timestamps: true, collection: 'EventsPlaned' }
)

const EventPlaned = mongoose.model(
  'EventsPlaned',
  eventsPlanedSchema,
  'EventsPlaned'
)
module.exports = EventPlaned
