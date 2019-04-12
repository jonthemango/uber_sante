persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;

class Clinics {
    constructor({rooms, name}){
        if (rooms > 0){
            let roomArr  = []
            for (let i=0; i<rooms; i++){
                roomArr.push(i)
            }
            this.rooms = roomArr;
            this.name = name;
        }
        
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
