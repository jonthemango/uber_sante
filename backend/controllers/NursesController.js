Nurse = require('../models/Nurse')


class NursesController {

    static makeNurse(req, res){
        console.log('test;')
        const {accessId, password} = req.body;

        const passwordHash = password;
        const nurse = new Nurse(accessId, passwordHash);
        
        // save the nurse in db

        res.json(nurse)
    }


    static getNurse(req, res){
        const nurseId = req.params.id;

        let nurse = {};
        
        // search in db for nurse

        res.json(nurse)
    }

    static updateNurse(req, res){
        const nurseId = req.params.id;
        const {accessId} = req.body;


        let nurse = {};
        
        // search in db for nurse

        // update them

        res.json(nurse);

    }

    static deleteNurse(req, res){
        const nurseId = req.params.id;

        // delete nurse from db

        res.json({deleted: true})
    }



}

module.exports = NursesController;