const express = require('express');

const CustomerController = require('./controllers/CustomerController');
const ServiceController = require('./controllers/ServiceController');
const ScheduleController = require('./controllers/ScheduleController');

const routes = express.Router();

routes.post('/customers', CustomerController.create);
routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.get);
routes.put('/customers/:id', CustomerController.update);
routes.delete('/customers/:id', CustomerController.delete);

routes.post('/services', ServiceController.create);
routes.get('/services', ServiceController.index);
routes.get('/services/:id', ServiceController.get);
routes.put('/services/:id', ServiceController.update);
routes.delete('/services/:id', ServiceController.delete);

routes.post('/schedules', ScheduleController.create);
routes.get('/schedules', ScheduleController.index);
routes.get('/schedules/:id', ScheduleController.get);
routes.put('/schedules/:id', ScheduleController.update);
routes.delete('/schedules/:id', ScheduleController.delete);

module.exports = routes;