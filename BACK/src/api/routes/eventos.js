const upload = require('../../middlewares/file')
const { isAuthAdmin } = require('../../middlewares/isAuth')
const {
  getAllEvents,
  postEvent,
  putEvent,
  deleteEvent,
  getEventById,
  getEventsByThematik,
  getEventByPrice,
  getEventsByQuery,
  getEventsByDuration,
  getEventsByAllFilter
} = require('../controllers/eventos')

const eventRouter = require('express').Router()

eventRouter.get('/', getAllEvents)
eventRouter.get('/thema/:tematik', getEventsByThematik)
eventRouter.get('/price/:price', getEventByPrice)
eventRouter.get('/search', getEventsByQuery)
eventRouter.get('/duration/:duration', getEventsByDuration)
eventRouter.get('/filters', getEventsByAllFilter)
eventRouter.get('/:id', getEventById)
eventRouter.post('/', upload.array('eventPictures', 5), postEvent)
eventRouter.put('/:id', upload.array('eventPictures', 5), putEvent)
eventRouter.delete('/:id', deleteEvent)

module.exports = eventRouter
