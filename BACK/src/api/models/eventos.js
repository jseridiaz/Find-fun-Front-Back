const mongoose = require('mongoose')
const eventsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 50 },
    tematik: {
      type: String,
      enum: ['Party', 'Trainings', 'Tour', 'Humor', 'Fan', 'Sport'],
      required: true
    },
    eventPictures: [{ type: String }],
    duration: { type: Number, required: true, trim: true },
    description: { type: String, trim: true, maxLength: 150 },
    price: { type: Number, required: true }
  },
  { timestamps: true, collection: 'events' }
)

const Event = mongoose.model('Event', eventsSchema, 'Event')
module.exports = Event
