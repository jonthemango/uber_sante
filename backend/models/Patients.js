persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');


class Patients {
    constructor({
        _id,
        healthCardNB,
        birthDay,
        gender,
        phoneNumber,
        physicalAddress,
        email,
        passwordHash }) {

        this._id = _id;
        this.healthCardNB = healthCardNB
        this.birthDay = birthDay
        this.gender = gender
        this.phoneNumber = phoneNumber
        this.physicalAddress = physicalAddress
        this.email = email
        this.passwordHash = passwordHash
    }


    // if the object has an id in the db, save it, otherwise create it
    async save() {
        let patients;
        if (this._id) {
            patients = await persist(async (db) => {
                return await db.collection("patients").upsertOne({ _id: ObjectId(this._id) }, { $set: { healthCardNB: this.healthCardNB, birthDay: this.birthDay, gender: this.gender, phoneNumber: this.phoneNumber, physicalAddress: this.physicalAddress, email:this.email } });
            });
        } else {
            patients = await persist(async (db) => {
                return await db.collection("patients").insertOne(this);
            });
            this._id = patients.ops[0]._id;
        }
        
    }

    

    static async get(id) {
        const patient = await persist(async (db) => {
            return await db.collection("patients").findOne({ _id: ObjectId(id) });
        });  
        return patient;
    }

    static async delete(id) {

        const deleted = await persist(async (db) => {
            // Remove a single document
            const result = await db.collection("patients").deleteOne({ _id: ObjectId(id) })
            console.log(result);
            return result.deletedCount > 0;
        })
        return deleted;
    }



}

module.exports = Patients;
