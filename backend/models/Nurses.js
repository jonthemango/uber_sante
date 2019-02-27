persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');


class Nurses {
    constructor({_id,
                accessId,
                passwordHash}){
        //username contains three letter followed by 5digits: DOL96315
        this.accessId = accessId;
        this.passwordHash = passwordHash;

    }

    // if the object has an id in the db, save it, otherwise create it
    async save() {
        let nurses;
        if (this._id) {
            nurses = await persist(async (db) => {
                return await db.collection("nurses").upsertOne({ _id: ObjectId(this._id) }, { $set: { _id: this._id, accessId: this.accessId, passwordHash: this.passwordHash } });
            });
        } else {
            nurses = await persist(async (db) => {
                return await db.collection("nurses").insertOne(this);
            });
            this._id = nurses.ops[0]._id;
        }
        return nurses;
        
    }

    static async get(id) {
        const nurse = await persist(async (db) => {
            return await db.collection("nurses").findOne({ _id: ObjectId(id) });
        });  
        return nurse;
    }

    static async delete(id) {

        const deleted = await persist(async (db) => {
            // Remove a single document
            const result = await db.collection("nurses").deleteOne({ _id: ObjectId(id) })
            console.log(result);
            return result.deletedCount > 0;
        })
        return deleted;
    }

}

module.exports = Nurses;
