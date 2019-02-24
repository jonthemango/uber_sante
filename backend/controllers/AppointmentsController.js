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
        const {appointmentId} = req.body;

        // get it from db

    }

    static getPatientAppointments(req, res){
        const patientId = req.params.id;

        // search for patient in db, return them
    }

    static getDoctorAppointments(req, res){
        const doctorId = req.params.id;

        // search for doctor in db, return them 
    }

    static getClinicAppointments(req, res){
        const clinicId = req.params.id;

        // return all appointment for a specific clinic (only 1 clinic during the first milestone)
    }

    
}

module.exports = AppointmentsController;