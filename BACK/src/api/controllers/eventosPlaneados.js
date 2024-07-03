const {
  response200,
  response201,
  response400
} = require('../../utils/response')
const EventPlaned = require('../models/eventosPlaneados')
const Participante = require('../models/participantes')
const mongoose = require('mongoose')
const getAllEventsPlaned = async (req, res, next) => {
  try {
    const allEventsP = await EventPlaned.find()
      .populate('name', 'name')
      .populate('participants')
      .sort({ date: 1 })
    return response200(
      allEventsP,
      `There was founded a ${allEventsP.length} total Events`,
      res
    )
  } catch (error) {
    return response400('Error Type: ' + error, res)
  }
}
const getEventsPlanedById = async (req, res, next) => {
  try {
    const { id } = req.params
    let eventPlanned = await EventPlaned.find({ name: id })
      .populate('name', 'name')
      .populate('participants')
      .sort({ date: 1 })
    return response200(
      eventPlanned,
      `There was founded a ${eventPlanned.length} total Events`,
      res
    )
  } catch (error) {
    return response400('Error Type: ' + error, res)
  }
}

const getEventsPlanedByCity = async (req, res, next) => {
  try {
    const { city } = req.params
    let eventPlanned = await EventPlaned.find({ city })
      .populate('name', 'name')
      .populate('participants')
      .sort({ date: 1 })
    return response200(
      eventPlanned,
      `There was founded a ${eventPlanned.length} total Events`,
      res
    )
  } catch (error) {
    return response400('Error Type: ' + error, res)
  }
}
const getCities = async (req, res, next) => {
  const { id } = req.params
  try {
    const events = await EventPlaned.aggregate([
      { $match: { name: { $eq: new mongoose.Types.ObjectId(id) } } },
      { $group: { _id: '$city' } }
    ])
    const cities = events.map((e) => e._id)

    console.log(events)

    return response200(
      cities,
      `There was founded a ${cities.length} total Events`,
      res
    )
  } catch (error) {
    return response400('Error Type: ' + error, res)
  }
}
const postEventPlaned = async (req, res, next) => {
  try {
    const newEventsP = EventPlaned(req.body)
    const EventPSaved = await newEventsP.save()
    return response201(EventPSaved, `Nuevo Participante creado`, res)
  } catch (error) {
    return response400(error, res)
  }
}
const putEventPlaned = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    // const altEventP = await EventPlaned.findById(id)
    const newEventP = EventPlaned(req.body)
    const { participants, ...rest } = req.body
    newEventP._id = id
    if (participants) {
      var updateParticipant = await Participante.findOneAndUpdate(
        { idUser: req.user._id },
        { $addToSet: { registeredEvents: id } },
        { new: true }
      )
    }

    const newEventPUpdated = await EventPlaned.findByIdAndUpdate(
      id,
      { ...rest, $addToSet: { participants } },
      {
        new: true
      }
    )
    return response200(
      {
        firstResult: newEventPUpdated,
        secondResult: updateParticipant ?? 'No exist'
      },
      `El evento ${id} se ha modificado correctamente`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const joinToEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const altEventP = await EventPlaned.findById(id)
    const newEventP = EventPlaned(req.body)
    const { participants, ...rest } = req.body
    newEventP._id = id

    const updateParticipant = await Participante.findOneAndUpdate(
      { idUser: req.user._id },
      { $addToSet: { registeredEvents: id } },
      { new: true }
    )

    const newEventPUpdated = await EventPlaned.findByIdAndUpdate(
      id,
      { ...rest, $addToSet: { participants } || altEventP.participants },
      {
        new: true
      }
    )
    return response200(
      {
        firstResult: newEventPUpdated,
        secondResult: updateParticipant ?? 'No exist'
      },
      `El ususario ${id} se ha modificado correctamente`,
      res
    )
  } catch (error) {
    response400(error, res)
  }
}

const deleteEventPlaned = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventPDeleted = await EventPlaned.findByIdAndDelete(id)

    return response200(
      eventPDeleted,
      `El Participante ${eventPDeleted.name}con id ${id} ha sido eliminado`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}

module.exports = {
  getAllEventsPlaned,
  getEventsPlanedById,
  getCities,
  joinToEvent,
  getEventsPlanedByCity,
  postEventPlaned,
  putEventPlaned,
  deleteEventPlaned
}
