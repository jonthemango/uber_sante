const Appointment = require('../models/Appointment')
const Patient = require('../models/Patients')
const Doctor = require('../models/Doctors')

class AppointmentsController {

    static async makeAppointment (req, res){  // (res, req)

        /*
        const body = {
"clinicId": "5c79642f43d24100061b3283", "patientId": "5c7970367584bf300cc541f4", "date": "2019-03-05", "blockIds": [9,10,11], "isAnnual": false
}
        post body to 'http://localhost:5001/api/appointments' 
        */
        
        const { clinicId, patientId, date, blockIds, isAnnual } = req.body;

        let builder = Appointment.Builder();
        builder = await builder
        .buildPatientInfo({patientId, clinicId})
        .buildAppointmentTime({date, blockIds})
        
        builder = await builder.assignRoom()
        builder = await builder.assignDoctor()


        try{
            const appointment = await builder.buildAppointment();
            res.json({success:true, data: {appointment}, message:"Appointment made."});
        } catch(err){
            res.json({success:false, error:err.message, message: "Appointment not made."})
        }
        
    }

    static async getAppointment(req, res){
        const appointmentId = req.params.id;

        let appointments = [];

        try{
            appointments = await Appointment.getAppointments({appointmentId})
            console.log(appointments.length)
            res.json({success:true, data: {"appointment": appointments[0]}, message:"Appointment returned."})
        } catch (err){
            console.log(err.message)
            res.json({success:false, error: err.message, message: "Appointment not returned. No appointment with that Id."})
        }
        
        
    }

    static async getPatientAppointments(req, res){
        const patientId = req.params.id;

        let appointments = [];

        try{
            const patient = await Patient.get(patientId);
            if (!patient.error){
                appointments = await Appointment.getAppointments({patientId});
            } else {
                throw new Error("Patient Id is invalid.")
            }
            
            res.json({success:true, data: {"appointments": appointments}, message:"Appointments returned."})
        } catch (err){
            res.json({success:false, error: err.message, message: "Appointment not returned."})
        }
    }

    static async getDoctorAppointments(req, res){
        const doctorId = req.params.id;

        let appointments = [];

        try{
            const doctor = await Doctor.get(doctorId);
            if (doctor == null || doctor.error){
                throw new Error("Doctor Id is invalid")
            }
            appointments = await Appointment.getAppointments({doctorId});
            
            
            res.json({success:true, data: {"appointments": appointments}, message:"Appointments returned."})
        } catch (err){
            if (err.message == "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters") err.message = "Doctor Id is invalid.";
            res.json({success:false, error: err.message, message: "Appointment not returned."})
        }
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