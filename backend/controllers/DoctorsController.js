Doctor = require('../models/Doctors')
Cookies = require('../models/Cookies')


class DoctorsController {

    static async makeDoctor(req, res) {

        const doctor = new Doctor(req.body);

        // save the doctor in db
        await doctor.add()

        if (doctor._id) {
            res.json({ success: true, data: {doctor}, message: "New doctor account created." })
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
            res.json({ success: true, data: {doctor}, message: "Doctor was retrived" });
        }
    }

    static async updateDoctor(req, res) {
        const doctorId = req.params.id;
        let doctor = new Doctor({ ...req.body, _id: doctorId });

        doctor = await doctor.update();
        if (doctor.error){
            res.json({success: false, error: doctor});
        } else {
            res.json({ success: true, data: {doctor}, message: "Doctor updated" });
        }
    }

    static async deleteDoctor(req, res) {
        const doctorId = req.params.id;

        // delete Doctor
        const deleted = await Doctor.delete(doctorId);


        res.json({ deleted: deleted })
    }


    static async setAvailability(req, res) {
        const doctorId = req.params.id;
        const { availability } = req.body;
        let doctor = await Doctor.get(doctorId);
        doctor = await doctor.setAvailability(availability);
        if (doctor) {
            // eventually send the availability to the 
            Cookies.sync(doctor);
            res.json({ success: true , data: {doctor}, message: "Availability set." })
        }
        else {
            res.json({ success: false, error: "Availability not set." })
        }

    }



}

module.exports = DoctorsController;