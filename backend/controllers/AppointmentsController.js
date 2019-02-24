Appointment = require('../models/Appointment')

class AppointmentsController {

    static makeAppointment (req, res){  // (res, req)
        
        console.log(req.body);
        const {clinicId, patientId, timeData, isAnnual, consume } = req.body;

        const builder = Appointment.Builder();
        const appointment = builder
        .buildPatientInfo(patientId, timeData, isAnnual, consume)
        .consumeDoctor(clinicId, timeData, isAnnual, consume)
        .consumeRoom(clinicId, timeData, isAnnual, consume)
        .maybeReleaseResources()
        .getAppointment();
        res.json(appointment);
    }

    static getAppointment(req, res){

    }

    static getAppointments(req, res){
        
        
    }
}

module.exports = AppointmentsController;