Nurse = require('../models/Nurses')


class NursesController {

    static async makeNurse(req, res){
        console.log('test;')
        const {accessId, password} = req.body;

        const passwordHash = password;
        const nurse = new Nurse({accessId, passwordHash});
        
        
        // save the nurse in db
        await nurse.save()
        
        if (nurse._id) {
            res.json({ success: true, data: nurse, message: "New nurse account created/updated" })
        } else {
            res.json({ success: false, data: nurse, message: "New nurse was not saved to database" })
        }

        res.json(nurse)
    }


    static async getNurse(req, res){
        const nurseId = req.params.id;

        
        // search in db for nurse
        const nurse = await Nurse.get(patientId);

        if (nurse == {} || nurse.error){
            res.json({success:false, error: nurse.error})
        } else {
            res.json({ success: true, data: nurse, message: "Nurse was retrived"});
        }

        res.json(nurse)
    }

    static async updateNurse(req, res){
        const nurseId = req.params.id;
        const nurse = new Nurse({...req.body, _id:nurseId});
        
        // save the nurse  in db
        await nurse.save()

        res.json({ success: true, data: nurse, message: "Nurse was updated"});
    }

    static async deleteNurse(req, res){
        const nurseId = req.params.id;

        // delete nurse from db
        const deleted = await Nurse.delete(patientId);

        res.json({ deleted: deleted, message: "Nurse was deleted" })
    }

}

module.exports = NursesController;