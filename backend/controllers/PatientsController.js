Patient = require('../models/Patients')

class PatientsController {

    static async makePatient(req, res) {
        const patient = new Patient(req.body)

        // save the patient in db
        await patient.add()

        if (patient._id) {
            res.json({ success: true, data: { patient }, message: "New patient account created." })
        } else {
            res.json({ success: false, error: patient, message: "New patient was not saved to database" })
        }
    }


    static async getPatient(req, res) {
        const patientId = req.params.id;

        const patient = await Patient.get(patientId);

        if (patient == undefined) {
            res.json({ success: false, error: "patient is undefined" })
        }
        else if (patient.error) {
            res.json({ success: false, error: patient.error })
        }
        res.json({ success: true, data: { patient }, message: "Patient was retrived" });

    }

    static async getPatientByEmail(req, res) {
        const patientEmail = req.params.email

        const patient = await Patient.getByEmail(patientEmail)

        if (patient == undefined) {
            res.json({ success: false, error: "patient is undefined" })
        }
        else if (patient.error) {
            res.json({ success: false, error: patient.error })
        }
        res.json({ success: true, data: { patient }, message: "Patient was retrived" })

    }

    static async updatePatient(req, res) {
        const patientId = req.params.id;
        let patient = new Patient({ ...req.body, _id: patientId });


        patient = await patient.update();

        if (patient.error) {
            res.json({ success: false, error: patient })
        } else {
            res.json({ success: true, data: { patient }, message: "Patient updated" })
        }

    }

    static async deletePatient(req, res) {
        const patientId = req.params.id;

        // delete patient from db
        const deleted = await Patient.delete(patientId);

        res.json({ deleted: deleted, message: "Patient was deleted" })
    }



}

module.exports = PatientsController;
