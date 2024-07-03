const {
  getAllEventsPlaned,
  postEventPlaned,
  putEventPlaned,
  deleteEventPlaned,
  getEventsPlanedById,
  getEventsPlanedByCity,
  getCities
} = require('../controllers/eventosPlaneados')

const eventPlanedRouter = require('express').Router()
eventPlanedRouter.get('/allcities/:id', getCities)
eventPlanedRouter.put('/attendees/event/:id', putEventPlaned)
eventPlanedRouter.get('/', getAllEventsPlaned)
eventPlanedRouter.get('/:id', getEventsPlanedById)
eventPlanedRouter.get('/city/:city', getEventsPlanedByCity)
eventPlanedRouter.post('/', postEventPlaned)
eventPlanedRouter.put('/:id', putEventPlaned)
eventPlanedRouter.delete('/:id', deleteEventPlaned)

module.exports = eventPlanedRouter
