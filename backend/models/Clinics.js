persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;

class Clinics {
    constructor({rooms, name}){
        this.rooms = rooms;
        this.name = name;
        this.doctors = [];
        this.nurses = [];
    }

    async add() {
        const result = await persist(async (db) => {
            return await db.collection("clinics").insertOne(this);
        })
        
        return result;
    }


    static async getAll(){
        const query = {};
        const clinics = await persist(async (db) => {
            return await db.collection("clinics").find(query).toArray();
        });
        return clinics
    }



    static async get(id){
        const clinic = await persist(async (db) => {
            return await db.collection("clinics").findOne({ _id: ObjectId(id) });
        });
        return clinic
    }

}


module.exports = Clinics;
