const Appointment = require('../models/Appointment')
const Patient = require('../models/Patients')
const Doctor = require('../models/Doctors')
const Clinics = require('../models/Clinics')
const { BusPublisher } = require('event-bus-mini')
const Payment = require('../models/Payment')



class AppointmentsController {

    static async makeAppointment(req, res) {  // (res, req)

        /*
        const body = {
            "clinicId": "5c79642f43d24100061b3283",
            "patientId": "5c7970367584bf300cc541f4",
            "date": "2019-03-05",
            "blockIds": [9,10,11],
        }
        post body to 'http://localhost:5001/api/appointments'
        */

        const publisher = new BusPublisher({ port: 7001 })

        const { clinicId, patientId, date, blockIds, paymentInfo } = req.body

        let builder = Appointment.Builder()
        builder = await builder
            .buildPatientInfo({ patientId, clinicId })
            .buildAppointmentTime({ date, blockIds })
        builder = await builder.assignRoom()
        builder = await builder.assignDoctor()


        try {
            if (Payment.isValid(paymentInfo)) {
                console.log("YANIS TEST")
                const appointment = await builder.buildAppointment();
                console.log("YANIS TEST4")
                publisher.publish({ event: "paymentPending", data: { appointment, paymentInfo } })
                console.log("YANIS TEST5")
                res.json({ success: true, data: { appointment }, message: "Appointment made." });
            } else {
                res.json({ success: false, message: "Incorrect payment information" })
            }
        } catch (err) {
            console.log("YANIS TEST3")
            console.log({err})
            res.json({ success: false, error: err.message, message: "Appointment not made." })
        }

    }


    static async getAppointment(req, res) {
        const appointmentId = req.params.id;

        let appointments = [];

        try {
            appointments = await Appointment.getAppointments({ appointmentId })
            console.log(appointments.length)
            res.json({ success: true, data: { "appointment": appointments[0] }, message: "Appointment returned." })
        } catch (err) {
            console.log(err.message)
            res.json({ success: false, error: err.message, message: "Appointment not returned. No appointment with that Id." })
        }


    }

    static async getPatientAppointments(req, res) {
        const patientId = req.params.id;

        let appointments = [];

        try {
            const patient = await Patient.get(patientId);
            if (!patient.error) {
                appointments = await Appointment.getAppointments({ patientId });
            } else {
                throw new Error("Patient Id is invalid.")
            }

            res.json({ success: true, data: { "appointments": appointments }, message: "Appointments returned." })
        } catch (err) {
            res.json({ success: false, error: err.message, message: "Appointment not returned." })
        }
    }

    static async getDoctorAppointments(req, res) {
        const doctorId = req.params.id;

        let appointments = [];

        try {
            const doctor = await Doctor.get(doctorId);
            if (doctor == null || doctor.error) {
                throw new Error("Doctor Id is invalid")
            }
            appointments = await Appointment.getAppointments({ doctorId });


            res.json({ success: true, data: { "appointments": appointments }, message: "Appointments returned." })
        } catch (err) {
            if (err.message == "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters") err.message = "Doctor Id is invalid.";
            res.json({ success: false, error: err.message, message: "Appointment not returned." })
        }
    }

    static async getClinicAppointments(req, res) {

        const clinicId = req.params.id;
        const { start, end } = req.query;

        let appointments = [];

        try {
            const clinic = await Clinics.get(clinicId);
            if (!clinic.error) {
                appointments = await Appointment.getAppointments({ clinicId, start, end });
            } else {
                throw new Error("Clinic Id is invalid.")
            }

            res.json({ success: true, data: { "appointments": appointments }, message: "Appointments returned." })
        } catch (err) {
            res.json({ success: false, error: err.message, message: "Appointment not returned." })
        }

    }

    static updateAppointment(req, res) {
        const appointmentId = req.params.id;
        const { clinicId, patientId, timeData, isAnnual, consume } = req.body;

        let appointment = {};

        res.json(appointment)
    }

    static async deleteAppointment(req, res) {
        const appointmentId = req.params.id;

        try {
            const result = await Appointment.delete(appointmentId)
        }
        catch (error) {
            console.log({ error })
            res.json({ success: false, message: "was not able to delete appointment" })
            return
        }
        res.json({ success: true, message: "appointment successfully deleted" })

    }


}

module.exports = AppointmentsController;
