const moment = require('moment');
const persist = require('../persistence');
Clinics = require('./Clinics');
Doctors = require('./Doctors')

class Appointment {
    constructor(){
        this.result = {made: true, message: []};
    }




    static async getAppointments({patientId, doctorId, clinicId, date, blockIds}){
        
        const query = {
            date
        }

        
        if (blockIds.length == 3){
            query.blockIds = blockIds
        } else if (blockIds.length == 1){
            query.blockIds = {$in : [...blockIds]}
        }
        
        if (clinicId){
            query.clinicId = clinicId
        }
        if (patientId){
            query.patientId = patientId;
        }
        if (doctorId){
            query.doctorId = doctorId;
        }
        const appointments = await persist(async (db) => {
            const appointments = await db.collection("appointments").find(query).toArray();
            return appointments;
        });
        return appointments
    }

    static async patientHasAnnual(patientId){
        const query = {
            patientId,
            blockIds: {$size: 3}
        }
        const patientAppointments = await persist(async (db) => {
            const patientAppointments = await db.collection("appointments").find(query).toArray();
            return patientAppointments;
        });
        return patientAppointments.length > 1
    }

    

    
    static Builder(){
        class Builder {
            constructor() { 
                this.appointment = new Appointment();
                return this;
            }

            async buildAppointmentTime({blockIds, date}){
                let isWithin = moment().add(4,'w').isAfter(moment(date));
                let isTodayOrLater = moment(date).add(1,'d').isAfter(moment(), 'day');
                if (!isWithin){
                    this.appointment.result.made = false;
                    this.appointment.result.message.push("Date is not within now and 4 weeks. " + date)
                }

                if (!isTodayOrLater){
                    this.appointment.result.made = false;
                    this.appointment.result.message.push("Date is before today. " + date);
                }
                if (blockIds.length == 1 && blockIds[0] <= 35 && blockIds >= 0 ) {
                    this.appointment.type = "walkin";
                } else if (blockIds.length == 3) {
                    this.appointment.type = "annual";
                    let hasAnnual = await Appointment.patientHasAnnual(this.appointment.patientId)
                    if (hasAnnual){
                        this.appointment.result.made = false;
                        this.appointment.result.message.push("Already has annual appointment.")
                    }
                    
                }

                date = moment(date);
                if (!date.isValid()){
                    throw "Date is not valid moment format. Provide '1995-12-25'";
                }

                this.appointment.blockIds = blockIds;
                this.appointment.date = date.format('YYYY-MM-DD')
                return this;
            }

    
            buildPatientInfo({patientId, clinicId}){
                if (patientId == undefined || clinicId == undefined){
                    this.appointment.result.made = false;
                    this.appointment.message.push("Invalid Patient/Clinic Info.");
                } 
                this.appointment.patientId = patientId;
                this.appointment.clinicId = clinicId;
                return this;
            }

            static noClinicRooms(clinicId){
                return 5;
            }

            async assignDoctor(){
                const doctorQuery = {
                    blockIds: this.appointment.blockIds,
                    date: this.appointment.date,
                    clinicId: this.appointment.clinicId
                }


                const doctors = await Doctors.getDoctors(doctorQuery);

                const appointmentQuery = {
                    blockIds: this.appointment.blockIds,
                    date: moment(this.appointment.date).format('YYYY-MM-DD')
                }

                const appointments = await Appointment.getAppointments(appointmentQuery);


                let doctorId;
                console.log(doctors.length);
                for (let i=0; i<appointments.length; i++){
                    doctorId = appointments[i].doctor._id;
                    for (let j=0; j<doctors.length; j++){
                        if (doctorId.toString() == doctors[j]._id.toString()){
                            doctors.splice(j,1);
                        }
                    }
                }
                if (doctors.length == 0){
                    this.appointment.result.made = false;
                    this.appointment.result.message.push("No available doctors.")
                }


                // choose a random doctor
                const luckyDoctor = doctors[Math.floor(Math.random() * doctors.length)];

                this.appointment.doctor = luckyDoctor; 
                
                
                return this;
            }
 
            async assignRoom(){
                const query = {
                    blockIds: this.appointment.blockIds,
                    date: moment(this.appointment.date).format('YYYY-MM-DD')
                }




                const appointments = await Appointment.getAppointments(query)
                const clinic  = await Clinics.get(this.appointment.clinicId);

                let availableRooms = new Set(clinic.rooms)

                // diff the allRooms and taken rooms to yield available rooms
                for (let i=0; i<appointments.length; i++){
                    availableRooms.delete(appointments[i].room);
                }


                availableRooms = Array.from(availableRooms);

                if (availableRooms.length > 0) this.appointment.room = availableRooms[0];
                else {
                    this.appointment.room = null;
                    this.appointment.result.made = false;
                    this.appointment.result.message.push("No rooms available.");
                }

                return this;
            }

            async buildAppointment(){
                if (!this.appointment.result.made){
                    throw this.appointment.result.message;
                }
                const appointment = await persist(async (db) => {
                    return await db.collection("appointments").insertOne(this.appointment);
                });
                this.appointment._id = appointment.ops[0]._id;
                return this.appointment;
            }
        }
        return new Builder();
    }
    
    

}

module.exports = Appointment;
