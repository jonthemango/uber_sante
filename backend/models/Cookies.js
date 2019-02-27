var moment = require('moment');


class Cookies {
    constructor({_id, doctorId, date, day, blockId, consumed}){

        this._id = _id;
        this.doctorId = doctorId;
        this.date = date;
        this.day = day;
        this.blockId = blockId;
        this.consumed = consumed;
    }

    async save() {
        let cookies;
        if (this._id) {
            cookies = await persist(async (db) => {
                return await db.collection("cookies").upsertOne({ _id: ObjectId(this._id) }, { $set:{ date: this.date, day:this.day, blockId:this.blockId, consumed: this.consumed}});
            });
        } else {
            cookies = await persist(async (db) => {
                return await db.collection("cookies").insertOne(this);
            });
            this._id = patients.ops[0]._id;
        }

        return cookies;
        
    }

    async consume(){
        this.consumed = true;
        await this.save();
        return this.consumed;
    }

    async release(){
        this.consumed = false;
        await this.save()
        return this.consumed;
    }

    static getNext21Dates(){
        const noWeeks = 3;
        let dayObj;
        let day;
        let dates = {
            "monday":[],
            "tuesday":[],
            "wednesday":[],
            "thursday":[],
            "friday":[]
        };
        for (let i=0; i<noWeeks*7; i++){
            dayObj = moment().add(i,'days');
            day = dayObj.format('dddd').toLowerCase()
            if (day == 'saturday' || day == 'sunday'){ continue; }
            dates[day].push(dayObj.format('L'))
        }
        return dates;   
    }



    static async sync(doctor){
        const weekdays = ["monday","tuesday","wednesday","thursday","friday"];
        let avail = doctor.availability;
        let date;
        
        
        let cookie;
        const dates = Cookies.getNext21Dates();
        for (let weekday in weekdays){
            for (let date in dates){
                for (let i=0; i<avail[weekday]; i++){
                    cookie = new Cookies({doctorId:doctor._id, date:date, day: weekday, blockId: i, consumed: avail[weekday][i]});
                    await cookie.save()
                }
            }
        }
        
    }
        

 }

exports.module = Cookies;