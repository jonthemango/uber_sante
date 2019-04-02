persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
Clinics = require('../models/Clinics')

class ClinicsController {

    static async makeClinic(req, res) {
        const clinic = new Clinics(req.body);

        // save the clinic in db
        await clinic.add();
        res.json({ success: true, data: { clinic }, message: "Clinic posted" });
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

    static async getClinic(req, res){
        const clinic = await Clinics.get(req.params.id);

        if (clinic.error || clinic == undefined) {
            res.json({ success: false, error: clinic.error })
        } else {
            res.json({ success: true, data: { clinic }, message: "Clinic retrived" });
        }
    }
}

module.exports = ClinicsController;
