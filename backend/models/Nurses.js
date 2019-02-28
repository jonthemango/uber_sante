persist = require('../persistence')
ObjectId = require('mongodb').ObjectID;
const assert = require('assert');


class Nurses {
    constructor({_id,
                accessId,
                passwordHash}){
        //username contains three letter followed by 5digits: DOL96315
        this._id = _id
        this.accessId = accessId;
        this.passwordHash = passwordHash;

    }

    async update(){
        const id = this._id;
        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("nurses").updateOne(
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
        const nurses = await persist(async (db) => {
            return await db.collection("nurses").insertOne(this);
        });
        this._id = nurses.ops[0]._id;
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
            return result.deletedCount > 0;
        })
        return deleted;
    }

}

module.exports = Nurses;
