const express = require('express')

const predioController = require('./controllers/predioController')
const usersController = require('./controllers/usersController')
const incidentsController = require('./controllers/detailsController')
const paymentController = require('./controllers/paymentController')

const routes = express.Router();

routes.post('/predios', predioController.create)
routes.get('/predios', predioController.index)

routes.post('/users', usersController.create)
routes.get('/users', usersController.index)
routes.delete('/users/:id', usersController.delete)
routes.put('/users/:id', usersController.put)

routes.get('/users/incidents/:id', incidentsController.index)

routes.get('/payment/:id/:year', paymentController.index)
routes.post('/payment/:id', paymentController.create)

module.exports = routes;