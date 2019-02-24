Patient = require('../models/Patients')


class PatientsController {

    static makePatient (req, res){

        const {healthCardNB, birthDay, gender, phoneNumber, physicalAddress, email, password} = req.body;

        const password = password;
        const patient = new Patient(healthCardNB, birthDay, gender,phoneNumber, physicalAddress, email, passwordHash);
        
        // save the patient in db

        res.json(patient)
    }


    static getPatient(req, res){
        const patientId = req.params.id;

        let patient = {}
        
        // search in db for patient

        res.json(patient)
    }

    static updatePatient(req, res){
        const {patientId, healthCardNB, birthDay, gender, phoneNumber, physicalAddress, email} = req.body;


        let patient = {};
        // search in db for patient

        // update them

        res.json(patient);

    }

    static deletePatient(req, res){
        const {patientId} = req.body;

        // delete patient from db

        res.json({deleted: true})
    }



}

module.exports = PatientsController;