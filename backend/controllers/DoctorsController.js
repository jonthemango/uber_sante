Doctor = require('../models/Doctors')


class DoctorsController {

    static async makeDoctor(req, res) {

        const doctor = new Doctor(req.body);

        // save the doctor in db
        await doctor.add()

        if (doctor._id) {
            res.json({ success: true, data: { doctor }, message: "New doctor account created." })
        } else {
            res.json({ success: false, error: patient.error, message: "New doctor was not saved to database" })
        }

    }


    static async getDoctor(req, res) {
        const doctorId = req.params.id;

        const doctor = await Doctor.get(doctorId);

        if (doctor.error || doctor == undefined) {
            res.json({ success: false, error: doctor.error })
        } else {
            res.json({ success: true, data: { doctor }, message: "Doctor was retrived" });
        }
    }

    static async getDoctorsByClinic(req, res){
        const clinicId = req.params.id;

        const doctors = await Doctor.getDoctors({clinicId});

        if (doctors.error || doctors == undefined) {
            res.json({ success: false, error: doctors.error })
        } else {
            res.json({ success: true, data: { doctors }, message: "Doctors for clinic were retrived" });
        }
    }

    static async updateDoctor(req, res) {
        const doctorId = req.params.id;
        let doctor = new Doctor({ ...req.body, _id: doctorId });

        doctor = await doctor.update();
        if (doctor.error) {
            res.json({ success: false, error: doctor });
        } else {
            res.json({ success: true, data: { doctor }, message: "Doctor updated" });
        }
    }

    static async deleteDoctor(req, res) {
        const doctorId = req.params.id;

        // delete Doctor
        const deleted = await Doctor.delete(doctorId);


        res.json({ deleted: deleted })
    }

    static isAvail(availability){
        /* Example of something that passes.
        {
            "availability" : {
                "monday": { "0": true, "1": true, "2": true, "3": true },
                "tuesday" : { "9": true, "10": true, "11": true, "30":true, "31":true},
                "wednesday" : {},
                "thursday": {},
                "friday": {}
                }
            }
        */
        const assert = require('assert');
        try {
            assert(availability["monday"])
            assert(availability["tuesday"])
            assert(availability["wednesday"])
            assert(availability["thursday"])
            assert(availability["friday"])

            return {success: true}
        } catch (err){
            return {success:false, error: err, message: "Availability is not valid. Must match { 'monday': {'9': true, ...}, ... }"}
        }
    }


    static async setAvailability(req, res) {
        const doctorId = req.params.id;
        const { availability } = req.body;

        let isAvail = DoctorsController.isAvail(availability);
        if (!isAvail.success){
            res.json(isAvail);
        }

        let doctor = await Doctor.get(doctorId);
        doctor = await doctor.setAvailability(availability);
        res.json({success: true, data: { doctor }, message: "Availability Set" });

    }



}

module.exports = DoctorsController;
