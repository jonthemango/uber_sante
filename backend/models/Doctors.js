persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

class Doctors {
    constructor({ _id,
        permit,
        firstname,
        lastname,
        specialty,
        city,
        availability }) {

        this.permit = permit
        this.firstname = firstname
        this.lastname = lastname
        this.specialty = specialty
        this.city = city
        this.availability = availability

    }
    
    

    async update(){
        const id = this._id;
        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("doctors").updateOne(
                { _id: new ObjectId(id) }, 
                {$set: {...this}}
                )
            .then((obj)=>{ return obj.result }).catch( (err) => {return err;});
            return result
        }).then( (result) => { return result} ).catch( (err) => {return err;});;
        this._id = id;
        if (result.ok){
            return this;
        } else { 
            return null;
        }
    }

    async add(){
        const doctors = await persist(async (db) => {
            return await db.collection("doctors").insertOne(this);
        });
        this._id = doctors.ops[0]._id;
        return doctors;
    }



    static async get(id) {
        const doctor = await persist(async (db) => {
            return await db.collection("doctors").findOne({ _id: ObjectId(id) });
        });
        return doctor;
    }

    static async delete(id) {

        const deleted = await persist(async (db) => {
            // Remove a single document
            const result = await db.collection("doctors").deleteOne({ _id: ObjectId(id) })
            return result.deletedCount > 0;
        })
        return deleted;
    }

    static async setAvailability(availability) {
        this.availability = availability
        const dataBaseDoctor = await this.save();

        if (dataBaseDoctor.availability) {
            return { success: true, doctor: dataBaseDoctor }
        }
        return { success: false, message: "availabilities have not been updated" }

    }



}

module.exports = Doctors;
