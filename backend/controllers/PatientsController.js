Patient = require('../models/Patients')

class PatientsController {

    static async makePatient(req, res) {
        const patient = new Patient(req.body)
        
        // save the patient in db
        await patient.save()
        
        if (patient._id) {
            res.json({ success: true, data: patient, message: "New patient account created" })
        } else {
            res.json({ success: false, data: patient, message: "New patient was not saved to database" })
        }
    }


    static async getPatient(req, res) {
        const patientId = req.params.id;

        const patient = await Patient.get(patientId);

        res.json({ success: true, data: patient, message: "Patient was retrived"});
    }

    static async updatePatient(req, res) {
        const patientId = req.params.id;
        const patient = new Patient({...req.body, _id:patientId});
        // save the patient in db
        await patient.save()

        res.json({ success: true, data: patient, message: "Patient was updated"});
    }

    static async deletePatient(req, res) {
        const patientId = req.params.id;

        // delete patient from db
        const deleted = await Patient.delete(patientId);

        res.json({ deleted: deleted, message: "Patient was deleted" })
    }



}

module.exports = PatientsController;