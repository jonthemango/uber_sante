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
    
    

    static async clearDoctorAvail(doctor){
        const deleted = await persist(async (db) => {
            const result = await db.collection("cookies").deleteMany(
                { doctorId: doctor._id, consumed: false }
            )
            return result.deletedCount > 0;
        })
        console.log(deleted);
        return deleted;
    }


    

    async update(){
        const id = this._id;
        const result = await persist(async (db) => {
            delete this._id;
            const result = await db.collection("cookies").updateOne(
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
        const cookies = await persist(async (db) => {
            return await db.collection("cookies").insertOne(this);
        });
        this._id = cookies.ops[0]._id;
        return cookies;
    }


    


    // NEEDS TO BE TESTED
    static async bulk(collection){
        console.log(collection.length);
        const result = await persist(async (db) => {
            return await db.collection("cookies").insertMany(collection, {ordered: true});
        });    
        return result;
    }

    // NEEDS TO BE TESTED
    async getsBrokenCookies(){
        const cookies = await persist(async (db) => {
            return await db.collection("cookies").find({consumed: true});
        });
        return cookies;
    }

    async consume(){
        this.consumed = true;
        await this.update();
        return this.consumed;
    }

    async release(){
        this.consumed = false;
        await this.update()
        return this.consumed;
    }

    static getNextXWeeks(x){
        const noWeeks = x;
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
        
        let cookie;
        
        let weekday;
        let date;
        const dates = Cookies.getNextXWeeks(3);
        let arr = []
        for (let i=0; i<weekdays.length; i++){
            weekday = weekdays[i];
            console.log("WEEKDAY: " + weekday)
            for (let j=0; j<dates[weekday].length; j++){
                date = dates[weekday][j];
                console.log("===> " + date);
                for (let blockId=0; blockId<avail[weekday].length; blockId++){
                    cookie = new Cookies({doctorId: doctor._id, date: date, day: weekday, blockId: blockId, consumed: avail[weekday][i]});
                    arr.push(cookie);
                }
            }
        }


        await Cookies.clearDoctorAvail(doctor); // wait until all unconsumed avail are removed

        let similar;
        console.log(arr.length);
        //const cookies = await getBrokenCookies();

        /*for (let i=0; i<arr.length; i++){
            cookie = arr[i];
            if (similar){
                arr[i] = undefined;
            } 
            // if cookie is being placed in the spot of another cookie then skip, else insert it
        }*/
        console.log("done")

        await Cookies.bulk(arr);

        
    }
        

 }

module.exports = Cookies;