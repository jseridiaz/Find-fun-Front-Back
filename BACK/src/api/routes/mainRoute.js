const { isAuth } = require('../../middlewares/isAuth')
const eventRouter = require('./eventos')
const eventPlanedRouter = require('./eventosPlaneados')
const participantesRouter = require('./participantes')
const routerCreation = require('./selectUser')
const userRouter = require('./usuarios')

const mainRouter = require('express').Router()

mainRouter.use('/api/auth', userRouter)
mainRouter.use('/api/attendees', [isAuth], participantesRouter)
mainRouter.use('/api/eventsplaned', [isAuth], eventPlanedRouter)
mainRouter.use('/api/events', eventRouter)
mainRouter.use('/api/user', [isAuth], routerCreation)

module.exports = mainRouter
