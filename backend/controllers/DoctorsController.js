Doctor = require('../models/Doctor')


class DoctorsController {

    static makeDoctor (req, res){

        const {password} = req.body;

        const passwordHash = password;
        const doctor = new Doctor(passwordHash);
        
        // save the doctor in db

        res.json(doctor)
    }


    static getDoctor(req, res){
        const doctorId = req.params.id;

        let doctor = {}
        
        // search in db for doctor

        res.json(dctor)
    }

    static updateDoctor(req, res){
        const doctorId = req.params.id;
        const {} = req.body;


        let doctor = {};
        
        // search in db for doctor

        // update them

        res.json(doctor);

    }

    static deleteDoctor(req, res){
        const doctorId = req.params.id;

        // delete doctor from db

        res.json({deleted: true})
    }



}

module.exports = DoctorsController;