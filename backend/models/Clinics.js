persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;

class Clinics {
    constructor(){

    }



    static async get(id){
        const clinic = await persist(async (db) => {
            return await db.collection("clinics").findOne({ _id: ObjectId(id) });
        });
        return clinic
    }

}


module.exports = Clinics;