persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
Clinics = require('../models/Clinics')

class ClinicsController {

    static async makeClinic(req, res) {
        const clinic = new Clinic(req.body);

        // save the clinic in db
        await clinic.add();
    }

    static async getClinics(req, res){
        // search in db for nurse
        const clinics = await Clinics.getAll();

        if (clinics.error || clinics == undefined) {
            res.json({ success: false, error: clinics.error })
        } else {
            res.json({ success: true, data: { clinics }, message: "Clinics retrived" });
        }

    }
}

module.exports = ClinicsController;
