persist = require('../persistence')
const moment = require('moment')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

class Doctors {
    constructor({ _id,
        email,
        password,
        permit,
        firstname,
        lastname,
        specialty,
        city,
        availability, clinicId }) {

        this._id = _id
        this.email = email
        this.password = password
        this.permit = permit
        this.firstname = firstname
        this.lastname = lastname
        this.specialty = specialty
        this.city = city
        this.availability = availability
        this.clinicId = clinicId

    }



    async update() {
        const id = this._id

        // get the password of the old doctor before updating it so that we dont
        // overwrite the password field.
        const doctorRecord = await persist(async (db) => {
            return await db.collection("doctors").findOne({ _id: ObjectId(id) });
        })
        this.password = doctorRecord.password

        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("doctors").updateOne(
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
            return await db.collection("doctors").insertOne(this);
        })
        if (result.ops[0] != undefined) {
            this._id = result.ops[0]._id
            let doctor = new Doctors({ ...result.ops[0] })
            delete doctor.password
            return doctor
        }
        return null
    }



    static async get(id) {
        const doctor = await persist(async (db) => {
            return await db.collection("doctors").findOne({ _id: ObjectId(id) });
        });
        if (doctor != undefined) {
            delete doctor.password
            return new Doctors({ ...doctor });
        }
        return null;

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

    static async getDoctors({ clinicId, blockIds, date, doctorId }) {
        let query = {};

        if (blockIds && date) {
            let day = moment(date).format('dddd').toLowerCase();
            let key;
            for (let i = 0; i < blockIds.length; i++) {
                key = "availability." + day + "." + blockIds[i];
                query[key] = true
            }
        }

        if (clinicId) {
            query.clinicId = clinicId
        }

        if (doctorId) {
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
