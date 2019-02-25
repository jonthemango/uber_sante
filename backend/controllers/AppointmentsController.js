Appointment = require('../models/Appointment')

class AppointmentsController {

    static makeAppointment (req, res){  // (res, req)
        
        const { clinicId, patientId, timeData, isAnnual, consume } = req.body;

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

        let appointment = {};
        
        // get it from db

        res.json(appointment)
    }

    static getPatientAppointments(req, res){
        const patientId = req.params.id;

        let appointments = [{}];

        // search for patient in db, return them

        res.json(appointments);
    }

    static getDoctorAppointments(req, res){
        const doctorId = req.params.id;

        let appointments = [{}];
        // search for doctor in db, return them 

        res.json(appointments)
    }

    static getClinicAppointments(req, res){
        const clinicId = req.params.id;

        let appointments = [{}];

        // return all appointment for a specific clinic (only 1 clinic during the first milestone)

        res.json(appointments);

    }

    static updateAppointment(req, res){
        const appointmentId = req.params.id;
        const {clinicId, patientId, timeData, isAnnual, consume } = req.body;
        
        let appointment = {}; 

        res.json(appointment)
    }

    static deleteAppointment(req, res){
        const appointmentId = req.params.id;
        
        // delete the appointment from db


    }

    
}

module.exports = AppointmentsController;