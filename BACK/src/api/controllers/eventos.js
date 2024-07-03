const { deleteFile } = require('../../utils/deleteFile')
const {
  response200,
  response400,
  response201
} = require('../../utils/response')
const Event = require('../models/eventos')

const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find()

    return response200(
      allEvents,
      ` There are a ${allEvents.length} total Events`,
      res
    )
  } catch (error) {
    return response400('Error Type: ' + error, res)
  }
}
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventFounded = await Event.findById(id)
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventByPrice = async (req, res, next) => {
  try {
    const { price } = req.params
    const eventFounded = await Event.find({ price: { $lte: price } }).sort({
      price: -1
    })
    console.log(eventFounded)
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventsByQuery = async (req, res, next) => {
  try {
    const { name } = req.query

    const eventFounded = await Event.find({
      name: new RegExp(name.trim(), 'i')
    })

    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventsByThematik = async (req, res, next) => {
  try {
    const { tematik } = req.params
    const eventFounded = await Event.find({ tematik })
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventsByDuration = async (req, res, next) => {
  try {
    const { duration } = req.params
    const eventFounded = await Event.find({
      duration: { $lte: duration }
    }).sort({ duration: -1 })
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventsByAllFilter = async (req, res, next) => {
  try {
    const { tematik, price, duration } = req.query
    let eventFounded
    if (tematik && price && duration) {
      eventFounded = await Event.find({
        tematik,
        price: { $lte: price },
        duration: { $lte: duration }
      }).sort({ price: -1, duration: -1 })
    } else if (tematik && price) {
      eventFounded = await Event.find({
        tematik,
        price: { $lte: price }
      }).sort({ price: -1 })
    } else if (tematik && duration) {
      eventFounded = await Event.find({
        tematik,
        duration: { $lte: duration }
      }).sort({ duration: -1 })
    } else if (!tematik && duration && price) {
      eventFounded = await Event.find({
        price: { $lte: price },
        duration: { $lte: duration }
      })
    } else if (tematik && !duration && !price) {
      eventFounded = await Event.find({ tematik })
    } else if (!tematik && !duration && price) {
      eventFounded = await Event.find({
        price: { $lte: price }
      }).sort({ price: -1 })
    } else if (!tematik && duration && !price) {
      eventFounded = await Event.find({ duration: { $lte: duration } }).sort({
        duration: -1
      })
    }
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getEventsByThemaAndPrice = async (req, res, next) => {
  try {
    const { tematik, price } = req.query
    const eventFounded = await Event.find({
      tematik,
      price: { $lte: price }
    }).sort({ price: -1 })
    return response200(
      eventFounded,
      `There was founded a ${eventFounded.length} total Events`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}

const postEvent = async (req, res, next) => {
  try {
    const newEvent = Event(req.body)
    if (req.files) {
      newEvent.eventPictures = req.files.map((e) => e.path)
    }
    const eventSaved = await newEvent.save()
    return response201(eventSaved, `Nuevo Participante creado`, res)
  } catch (error) {
    return response400(error, res)
  }
}
const putEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const altEvent = await Event.findById(id)
    const { eventPictures, ...reqBody } = req.body
    const newEvent = Event(req.body)
    newEvent._id = id

    if (req.files) {
      if (altEvent.eventPictures) {
        for (const img of altEvent['eventPictures']) {
          deleteFile(img)
        }
      }
      for (const file of req.files) {
        newEvent.eventPictures.push(file.path)
      }
    }
    const eventUpdated = await Event.findByIdAndUpdate(
      id,
      {
        ...reqBody,
        eventPictures: newEvent.eventPictures || altEvent.eventPictures
      },
      {
        new: true
      }
    )

    return response200(
      eventUpdated,
      `El evento ${altEvent.name} con id ${id} se ha modificado correctamente`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventDeleted = await Event.findByIdAndDelete(id)
    for (const picture of eventDeleted.eventPictures) {
      deleteFile(picture)
    }
    return response200(
      eventDeleted,
      `El Participante ${eventDeleted.name}con id ${id} ha sido eliminado`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
module.exports = {
  getAllEvents,
  getEventById,
  getEventsByThematik,
  getEventByPrice,
  getEventsByDuration,
  getEventsByQuery,
  getEventsByAllFilter,
  getEventsByThemaAndPrice,
  postEvent,
  putEvent,
  deleteEvent
}
