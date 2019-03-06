persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');


class Patients {
    constructor({
        _id,
        healthCardNB,
        firstname,
        lastname,
        birthDay,
        gender,
        phoneNumber,
        physicalAddress,
        email,
        passwordHash }) {

        this._id = _id;
        this.healthCardNB = healthCardNB
        this.firstname = firstname
        this.lastname = lastname
        this.birthDay = birthDay
        this.gender = gender
        this.phoneNumber = phoneNumber
        this.physicalAddress = physicalAddress
        this.email = email
        this.passwordHash = passwordHash
    }



    async update() {
        const id = this._id;
        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("patients").updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...this } }
            )
                .then((obj) => { return obj.result }).catch((err) => { return err; });
            return result
        }).then((result) => { return result }).catch((err) => { return err; });;
        this._id = id;
        if (result.ok) {
            return this;
        } else {
            return null;
        }
    }

    async add() {
        const patients = await persist(async (db) => {
            return await db.collection("patients").insertOne(this);
        });
        this._id = patients.ops[0]._id;
        return patients;
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
            return result.deletedCount > 0;
        })
        return deleted;
    }



}

module.exports = Patients;
