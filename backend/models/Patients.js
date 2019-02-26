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

//  TESTED AND WORKS
    // if the object has an id in the db, save it, otherwise create it
    async save() {
        let patients;
        if (this._id) {
            patients = await persist(async (db) => {
                return await db.collection("patients").upsertOnem({ _id: new ObjectId(this._id) }, { $set: { healthCardNB, birthDay, gender, phoneNumber, physicalAddress, email } });
            });
        } else {
            patients = await persist(async (db) => {
                return await db.collection("patients").insertOne(this);
            });
        }

        // this = new Patients(patient)
        // this does not compile ^ so please calm down jon

        return patients.ops[0] // this is the exact patient plus the id
    }

// UNTESTED FOR NOW
    async delete() {
        // you can only delete a patient if it's id is set
        if (this._id) {
            deleted = await persist(async (db) => {
                // Remove a single document
                db.collection("patients").deleteOne({ _id: new ObjectId(this._id) })
                return result.deletedCount > 0;
            })
            return { deleted };
        }
        return { error: "You cannot delete a patient that doesn't have an id" }
    }

// UNTESTED FOR NOW
    static async get(id) {
        patient = await persist(async (db) => {
            return await db.collection("patients").find({ _id: new ObjectId(patientId) }).toArray();
        });
        return this(patient);
    }



}

module.exports = Patients;
