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
        console.log("patientId from params", patientId)
        console.log("\n****this is the received patient", req.body)

        let patient = new Patient({ ...req.body, _id: patientId });
        console.log("\n****this is the constructed", patient)

        patient = await patient.update();
        console.log("\n****this is the updated patient", patient)
        if (patient.error) {
            res.json({ success: false, error: patient })
        } else {
            res.json({ success: true, data: { patient }, message: "Patient updated" })
        }

    }

    static async deletePatient(req, res) {
        const patientId = req.params.id;

        try {
            // delete patient from db
            const result = await Patient.delete(patientId)
            res.json({ success: true, result, message: "Patient was deleted" })
        } catch (error) {
            res.json({ success: false, message: "Unable to delete patient" })
        }
    }

}

module.exports = PatientsController;
