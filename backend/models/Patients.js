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
        sex,
        phoneNumber,
        physicalAddress,
        email,
        password,
        cart }) {

        this._id = _id;
        this.healthCardNB = healthCardNB
        this.firstname = firstname
        this.lastname = lastname
        this.birthDay = birthDay
        this.sex = sex
        this.phoneNumber = phoneNumber
        this.physicalAddress = physicalAddress
        this.email = email
        this.password = password
        this.cart = cart
        console.log("from constructor,",{ _id,
            healthCardNB,
            firstname,
            lastname,
            birthDay,
            sex,
            phoneNumber,
            physicalAddress,
            email,
            password,
            cart})
    }



    async update() {
        const id = this._id

        // get the password of the old patient before updating it so that we dont
        // overwrite the password field.
        const patientRecord = await persist(async (db) => {
            return await db.collection("patients").findOne({ _id: ObjectId(id) })
        })
        this.password = patientRecord.password

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
        const result = await persist(async (db) => {
            return await db.collection("patients").insertOne(this)
        })
        if (result.ops[0] != undefined) {
            this._id = result.ops[0]._id
            let patient = new Patients({ ...result.ops[0] })
            delete patient.password
            return patient
        }
        return null
    }



    static async get(id) {
        const patient = await persist(async (db) => {
            return await db.collection("patients").findOne({ _id: ObjectId(id) })
        })

        if (patient != undefined) {
            delete patient.password
            return new Patients({...patient})
        }
        return null
    }

    static async getAll() {
        const patients = await persist(async (db) => {
            return await db.collection("patients").find({}).toArray();
        })
        return patients;
    }

    static async getByEmail(email){
        const patient = await persist(async (db)=>{
            return await db.collection("patients").findOne({email})
        })
        if (patient !=undefined){
            delete patient.password
            return new Patients({...patient})
        }
        return null
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
