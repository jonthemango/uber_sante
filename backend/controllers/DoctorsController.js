Doctor = require('../models/Doctors')
Cookies = require('../models/Cookies')


class DoctorsController {

    static async makeDoctor(req, res) {

        const doctor = new Doctor(req.body);

        // save the doctor in db
        await doctor.save()

        if (doctor._id) {
            res.json({ success: true, data: { doctor } })
        } else {
            res.json({ success: false, message: "" })
        }

    }


    static async getDoctor(req, res) {
        const doctorId = req.params.id;

        let doctor = {}
        console.log("YANIS")
        doctor = Doctor.get(doctorId);

        if (doctor == {} || doctor.error) {
            res.json({ success: false, error: doctor.error })
        } else {
            res.json({ success: true, data: doctor, message: "Doctor was retrived" });
        }
    }

    static async updateDoctor(req, res) {
        const doctorId = req.params.id;

        
        const doctor = new Doctor({ ...req.body, _id: doctorId });
        //const doctor = await Doctor.get(doctorId);
        // update them
        await doctor.save();
        res.json({ success: true, data: {doctor}, message: "Doctor was updated" });
    }

    static async deleteDoctor(req, res) {
        const doctorId = req.params.id;

        // delete Doctor
        console.log("YAnis1")
        await Doctor.delete(doctorId);


        res.json({ deleted: true })
    }


    static async setAvailability(req, res) {
        const doctor_id = req.params.id;
        const { availability } = req.body;
        existingDoctor = await Doctor.get(doctor_id);
        console.log(existingDoctor);
        const { success, doctor, message } = await existingDoctor.setAvailability(availability)
        if (success) {
            // eventually send the availability to the 
            //Cookies.sync(existingDoctor);
            res.json({ success })
        }
        else {
            res.json({ success, message })
        }

    }



}

module.exports = DoctorsController;