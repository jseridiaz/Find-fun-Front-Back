const { putEventPlaned } = require('../controllers/eventosPlaneados')
const { deleteParticipantOfEvent } = require('../controllers/participantes')

const routerCreation = require('express').Router()

routerCreation.put('/attendees/:id', putEventPlaned)
routerCreation.put('/attendees/eventRegistered/:id', deleteParticipantOfEvent)

module.exports = routerCreation
