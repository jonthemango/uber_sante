persist = require('../persistence')
const moment = require('moment')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

class Doctors {
    constructor({ _id,
        permit,
        firstname,
        lastname,
        specialty,
        city,
        availability, clinicId }) {

        this._id = _id;
        this.permit = permit
        this.firstname = firstname
        this.lastname = lastname
        this.specialty = specialty
        this.city = city
        this.availability = availability
        this.clinicId = clinicId

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
        return new Doctors({...doctor, _id:id});
    }

    static async delete(id) {

        const deleted = await persist(async (db) => {
            // Remove a single document
            const result = await db.collection("doctors").deleteOne({ _id: ObjectId(id) })
            return result.deletedCount > 0;
        })
        return deleted;
    }

    

    async setAvailability(availability) {
        this.availability = availability
        const doctor = await this.update();
        if (doctor.availability) {
            return doctor
        } else return null;

    }

    static async getDoctors({clinicId, blockIds, date, doctorId}){
        let query = {};

        if (blockIds && date){
            let day = moment(date).format('dddd').toLowerCase();
            let key;
            for (let i=0; i<blockIds.length; i++){
                key = "availability." + day + "." + blockIds[i];
                query[key] = true
            }            
        }

        if (clinicId){
            query.clinicId = clinicId
        }

        if (doctorId){
            query.doctorId = doctorId;
        }


        console.log(query);
        const doctors = await persist(async (db) => {
            const doctors = await db.collection("doctors").find(query).toArray();
            return doctors;
        });

        return doctors
    }

   



}

module.exports = Doctors;
