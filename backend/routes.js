// =========== Declare API Constants =========
app = require('./app')

// ============ Declare all Routers ===========
const appointments = require('express').Router();

// =========== Put all those routers in a list  ===========
const routes = {appointments}

// =========== USERS ================
const AppointmentsController = require("./controllers/AppointmentsController");
appointments.post(`/appointments/`, AppointmentsController.makeAppointment);



module.exports = routes


