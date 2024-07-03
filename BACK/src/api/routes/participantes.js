const upload = require('../../middlewares/file')
const {
  getAllParticipants,
  getParticipantById,
  postParticipant,
  putParticipant,
  deleteParticipant,
  getProfilByIdUser,
  getAllParticipantsWithEvents,
  getAllParticipantsForName
} = require('../controllers/participantes')

const participantesRouter = require('express').Router()

participantesRouter.get(`/name`, getAllParticipantsForName)
participantesRouter.get('/idUser/:id', getProfilByIdUser)
participantesRouter.get('/events', getAllParticipantsWithEvents)
participantesRouter.get('/:id', getParticipantById)
participantesRouter.get('/', getAllParticipants)
participantesRouter.post('/', upload.single('avatar'), postParticipant)
participantesRouter.put('/:id', upload.single('avatar'), putParticipant)
participantesRouter.delete('/:id', deleteParticipant)

module.exports = participantesRouter
