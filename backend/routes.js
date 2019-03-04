// =========== Declare API Constants =========
app = require('./app');
express = require('express');

// ============ Declare all Routers ===========
const appointments = express.Router();
const patients = express.Router();
const nurses = express.Router();
const clinics = express.Router();
const doctors = express.Router();

// =========== Put all those routers in a list  ===========
const routes = { appointments, patients, nurses, clinics, doctors }

// =========== Routes ================

// =========== Appointments ===========
const AppointmentsController = require("./controllers/AppointmentsController");
appointments.post('/appointments', AppointmentsController.makeAppointment);
appointments.get('/appointments/:id', AppointmentsController.getAppointment);
appointments.get('/patients/:id/appointments', AppointmentsController.getPatientAppointments);
appointments.get('/doctors/:id/appointments', AppointmentsController.getDoctorAppointments);
appointments.get('/clinics/:id/appointments', AppointmentsController.getClinicAppointments);
appointments.put('/appointments/:id', AppointmentsController.updateAppointment);
appointments.delete('/appointments/:id', AppointmentsController.deleteAppointment);
// =========== CRUD Patients ===========
const PatientsController = require("./controllers/PatientsController");
patients.post('/patients/', PatientsController.makePatient);
patients.get('/patients/:id', PatientsController.getPatient);
patients.put('/patients/:id', PatientsController.updatePatient);
patients.delete('/patients/:id', PatientsController.deletePatient);

// ======== CRUD Nurses ==============
const NursesController = require("./controllers/NursesController");
nurses.post('/nurses/', NursesController.makeNurse);
nurses.get('/nurses/:id', NursesController.getNurse);
nurses.put('/nurses/:id', NursesController.updateNurse);
nurses.delete('/nurses/:id', NursesController.deleteNurse);


// ======== CRUD Doctors ============
const DoctorsController = require("./controllers/DoctorsController");
doctors.post('/doctors/', DoctorsController.makeDoctor);
doctors.get('/doctors/:id', DoctorsController.getDoctor);
doctors.put('/doctors/:id', DoctorsController.updateDoctor);
doctors.delete('/doctors/:id', DoctorsController.deleteDoctor);
doctors.post('/doctors/:id/availability', DoctorsController.setAvailability);




module.exports = routes


