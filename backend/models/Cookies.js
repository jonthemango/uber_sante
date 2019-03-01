var moment = require('moment');


class Cookies {
    constructor({ _id, doctorId, date, day, blockId, consumed }) {

        this._id = _id;
        this.doctorId = doctorId;
        this.date = date;
        this.day = day;
        this.blockId = blockId;
        this.consumed = consumed;
    }

    // this method clears all non consumed cookies associated to the passed
    // doctorId. Tested with axios: it works.
    static async clearDoctorCookies(doctorId) {
        const deleted = await persist(async (db) => {
            const result = await db.collection("cookies").deleteMany(
                { doctorId, consumed: false }
            )
            return result.deletedCount > 0;
        })
        console.log(deleted);
        return deleted;
    }



    // What is the purpose of this? In what use case would you update a single
    // cookie?
    async update() {
        const id = this._id;
        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("cookies").updateOne(
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
        const cookies = await persist(async (db) => {
            return await db.collection("cookies").insertOne(this);
        });
        this._id = cookies.ops[0]._id;
        return cookies;
    }





    // Tested with axios: it works. you just have to make sure that if you have
    // an array with duplicate objects, they have to be deep copies not shallow.
    // Shallow copies will be considered as a single record in the db.
    static async bulk(collection) {
        console.log(collection.length);
        const result = await persist(async (db) => {
            return await db.collection("cookies").insertMany(collection, { ordered: true });
        });
        return result;
    }

    // NEEDS TO BE TESTED
    async getsBrokenCookies() {
        const cookies = await persist(async (db) => {
            return await db.collection("cookies").find({ consumed: true });
        });
        return cookies;
    }

    async consume() {
        this.consumed = true;
        await this.update();
        return this.consumed;
    }

    async release() {
        this.consumed = false;
        await this.update()
        return this.consumed;
    }

    static getNextXWeeks(x) {
        const noWeeks = x;
        let dayObj;
        let day;
        let dates = {
            "monday": [],
            "tuesday": [],
            "wednesday": [],
            "thursday": [],
            "friday": []
        };
        for (let i = 0; i < noWeeks * 7; i++) {
            dayObj = moment().add(i, 'days');
            day = dayObj.format('dddd').toLowerCase()
            if (day == 'saturday' || day == 'sunday') { continue; }
            dates[day].push(dayObj.format('L'))
        }
        return dates;
    }





    static async sync(docId, newAvail) {

        await this.clearDoctorCookies(docId)


        const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];


        let cookie;

        let weekday;
        let date;
        const dates = Cookies.getNextXWeeks(3);
        let newCookies = []

        for (let i = 0; i < weekdays.length; i++) {

            weekday = weekdays[i];
            console.log("WEEKDAY: " + weekday)

            for (let j = 0; j < dates[weekday].length; j++) {

                date = dates[weekday][j];
                console.log("===> " + date);

                for (let blockId = 0; blockId < newAvail[weekday].length; blockId++) {

                    cookie = new Cookies({ doctorId: docId, date, day: weekday, blockId, consumed: newAvail[weekday][i] });
                    newCookies.push(cookie);
                }
            }
        }

        const result = await this.bulk(newCookies)

        return result

    }


}

module.exports = Cookies;