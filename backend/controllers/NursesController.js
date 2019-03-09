Nurse = require('../models/Nurses')


class NursesController {

    static async makeNurse(req, res) {
        const { accessId, password } = req.body;

        let nurse = new Nurse({ accessId, password })


        // save the nurse in db
        nurse = await nurse.add()

        if (nurse._id) {
            res.json({ success: true, data: { nurse }, message: "New nurse account created." })
        } else {
            res.json({ success: false, error: nurse, message: "New nurse was not saved to database" })
        }
    }


    static async getNurse(req, res) {
        const nurseId = req.params.id;

        // search in db for nurse
        const nurse = await Nurse.get(nurseId);

        if (nurse.error || nurse == undefined) {
            res.json({ success: false, error: nurse.error })
        } else {
            res.json({ success: true, data: { nurse }, message: "Nurse was retrived" });
        }
    }

    static async updateNurse(req, res) {
        const nurseId = req.params.id;
        let nurse = new Nurse({ ...req.body, _id: nurseId });

        // save the nurse  in db
        nurse = await nurse.update()
        if (nurse.error) {
            res.json({ success: false, data: nurse.error })
        } else {
            res.json({ success: true, data: { nurse }, message: "Nurse was updated" });
        }
    }

    static async deleteNurse(req, res) {
        const nurseId = req.params.id;

        // delete nurse from db
        const deleted = await Nurse.delete(nurseId);

        res.json({ deleted: deleted, message: "Nurse was deleted" })
    }

}

module.exports = NursesController;
