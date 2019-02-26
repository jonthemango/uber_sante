Patient = require('../models/Patients')

class PatientsController {

    static async makePatient(req, res) {
        console.log("body", req.body)
        let newPatient = new Patient(req.body)
        // save the patient in db
        newPatient = await newPatient.save()
        
        console.log("new patient:", newPatient)
        if (newPatient._id) {
            res.json({ success: true, message: "New patient account created" })
        } else {
            res.json({ success: false, message: "New patient was not saved to database" })
        }
    }


    static async getPatient(req, res) {
        const patientId = req.params.id;

        let patient = {};

        patient = Patient.get(patientId);

        res.json(patient);
    }

    static updatePatient(req, res) {
        const { patientId, healthCardNB, birthDay, gender, phoneNumber, physicalAddress, email } = req.body;


        let patient = {};

        // search in db for patient

        // update them

        res.json(patient);

    }

    static deletePatient(req, res) {
        const { patientId } = req.body;

        // delete patient from db

        res.json({ deleted: true })
    }



}

module.exports = PatientsController;