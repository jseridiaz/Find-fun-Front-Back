const { deleteFile } = require('../../utils/deleteFile')
const {
  response400,
  response200,
  response201
} = require('../../utils/response')
const EventPlaned = require('../models/eventosPlaneados')
const Participante = require('../models/participantes')

const getAllParticipants = async (req, res, next) => {
  try {
    const getAllParticipants = await Participante.find()
      .populate('email', 'email')
      .populate({
        path: 'registeredEvents',
        populate: { path: 'name', model: 'Event' }
      })
      .populate({
        path: 'registeredEvents',
        populate: { path: 'participants', model: 'participantes' }
      })
      .populate('idUser')

    return response200(
      getAllParticipants,
      `Estos son todos los participantes. Un total de: ${getAllParticipants.length}`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getAllParticipantsWithEvents = async (req, res, next) => {
  try {
    const getAllParticipants = await Participante.find({
      registeredEvents: { $ne: [] }
    })
      .populate('email', 'email')
      .populate({
        path: 'registeredEvents',
        populate: { path: 'name', model: 'Event' }
      })
      .populate({
        path: 'registeredEvents',
        populate: { path: 'participants', model: 'participantes' }
      })
      .populate('idUser')

    return response200(
      getAllParticipants,
      `Estos son todos los participantes. Un total de: ${getAllParticipants.length}`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getAllParticipantsForName = async (req, res, next) => {
  try {
    const { name } = req.query
    const getAllParticipants = await Participante.find({
      name: new RegExp(name.trim(), 'i')
    })
      .populate('email', 'email')
      .populate({
        path: 'registeredEvents',
        populate: { path: 'name', model: 'Event' }
      })
      .populate({
        path: 'registeredEvents',
        populate: { path: 'participants', model: 'participantes' }
      })
      .populate('idUser')

    return response200(
      getAllParticipants,
      `Here there are all Attendees who will assist to the events. A total of: ${getAllParticipants.length}`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getParticipantById = async (req, res, next) => {
  try {
    const { id } = req.params
    const getParticipant = await Participante.findOne({ _id: id })
      .populate({
        path: 'registeredEvents',
        populate: { path: 'name', model: 'Event' }
      })
      .populate('registeredEvents')

    return response200(
      getParticipant,
      `Este es el participante ${getParticipant.name} ${getParticipant.surname}`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const postParticipant = async (req, res, next) => {
  try {
    const newParticipant = Participante(req.body)
    newParticipant.email = req.user.email
    newParticipant.idUser = req.user._id
    if (req.file) {
      newParticipant.avatar = req.file.path
    }
    const participantSaved = await newParticipant.save()
    return response201(participantSaved, `Nuevo Participante creado`, res)
  } catch (error) {
    return response400(error, res)
  }
}
const putParticipant = async (req, res, next) => {
  try {
    const { id } = req.params
    const altParticipant = await Participante.findById(id)

    const { registeredEvents: eventbody, ...restOfBody } = req.body

    const newParticipant = Participante(req.body)
    newParticipant._id = id
    if (req.file) {
      if (altParticipant.avatar) {
        deleteFile(altParticipant.avatar)
      }
    }

    const participantUpdated = await Participante.findByIdAndUpdate(
      id,
      {
        ...restOfBody,
        avatar: req.file.path,
        $addToSet: {
          registeredEvents: {
            $each: req.body.registeredEvents || [
              ...altParticipant.registeredEvents
            ]
          }
        }
      },
      {
        new: true
      }
    )

    return response200(
      participantUpdated,
      `El ususario ${id} se ha modificado correctamente`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}

const deleteParticipant = async (req, res, next) => {
  try {
    const { id } = req.params
    const participantDeleted = await Participante.findByIdAndDelete(id)

    deleteFile(participantDeleted.avatar)
    return response200(
      participantDeleted,
      `El Participante ${participantDeleted.name} ${participantDeleted.surname} con id ${id} ha sido eliminado`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const deleteParticipantOfEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const participant = await Participante.findOneAndUpdate(
      { idUser: req.user._id },
      { $pull: { registeredEvents: id } },
      { new: true }
    )
    const eventUpdated = await EventPlaned.findByIdAndUpdate(
      id,
      {
        $pull: { participants: participant._id }
      },
      { new: true }
    )
    return response200(
      { firstResult: participant, secondResult: eventUpdated },
      `You ${participant._id} ${participant.name} are unregistered of this Event`,
      res
    )
  } catch (error) {
    return response400(error, res)
  }
}
const getProfilByIdUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const findProfil = await Participante.findOne({ idUser: id })
    if (!findProfil) {
      return response400(`There isn't created Profil`, res)
    }
    return response200(findProfil, `The profils is founded`, res)
  } catch (error) {
    response400(error, res)
  }
}

module.exports = {
  getAllParticipants,
  getParticipantById,
  getProfilByIdUser,
  getAllParticipantsWithEvents,
  getAllParticipantsForName,
  postParticipant,
  putParticipant,
  deleteParticipant,
  deleteParticipantOfEvent
}
