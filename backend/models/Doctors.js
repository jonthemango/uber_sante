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
    // if the object has an id in the db, save it, otherwise create it
    async save() {
        let doctor;
        if (this._id) {
            doctor = await persist(async (db) => {
                return await db.collection("doctors").upsertOne({ _id: new ObjectId(this._id) }, { $set: { _id: this._id, permit: this.permit, firstname: this.firstname, lastname: this.lastname, specialty: this.specialty, city: this.city, availability: this.availability } });
            });
        } else {
            doctor = await persist(async (db) => {
                return await db.collection("doctors").insertOne(this);
            });
            this._id = doctor.ops[0]._id;
        }
        return doctor.ops[0]
    }



    static async get(id) {
        const doctor = await persist(async (db) => {
            return await db.collection("doctors").findOne({ _id: new ObjectId(id) });
        });
        return doctor;
    }

    static async delete(id) {

        const deletedCount = await persist(async (db) => {
            // Remove a single document
            console.log("Yanis2")
            const result = await db.collection("doctors").deleteOne({ _id: new ObjectId(id) })
            console.log(result, "Yanis3");
            return result.deletedCount > 0;
        })
        return deletedCount;
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
