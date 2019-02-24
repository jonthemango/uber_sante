Appointment = require('../models/Appointment')

class AppointmentsController {

    static makeAppointment (req, res){  // (res, req)
        
        console.log(req.body);
        const {clinicId, patientId, timeData, isAnnual, consume } = req.body;

        const builder = Appointment.Builder();
        const appointment = builder
        .buildPatientInfo(patientId, timeData, isAnnual)
        .consumeDoctor(clinicId, timeData, isAnnual, consume)
        .consumeRoom(clinicId, timeData, isAnnual, consume)
        .maybeReleaseResources()
        .getAppointment();
        res.json(appointment);
    }
}

module.exports = AppointmentsController;