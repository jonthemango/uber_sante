class Appointment {
    constructor(){

    }


    static releaseDoctor(){
        this.doctor = null;

        // update availability in db
    }

    static releaseRoom(){
        this.room = null;

        // update availability in db
    }


    static cancelAppointment(){
        releaseRoom();
        releaseDoctor();

        // remove appointment from db
    }

    
    static Builder(){
        class Builder {
            constructor() { 
                this.appointment = new Appointment();
            }
    
            buildPatientInfo(patientId, timeData, aptType, consume){
                this.appointment.patientId = patientId;
                this.appointment.timeData = timeData
                this.appointment.aptType = aptType;
                this.appointment.isReal = consume;
                return this;
            }
            
            consumeDoctor(clinicId, timeData, consume){
                this.appointment.doctor = null;
                
                if (consume){
                    // update db
                } else {
                    // take a resource that may be taken later (ie do not consume)
                }

                return this;
            }
            
            consumeRoom(clinicId, timeData, consume){
                this.appointment.room = null;

                if (consume){
                    // update db
                } else {
                    // take a resource that may be taken later (ie do not consume)
                }

                return this;
            }
    
            maybeReleaseResources(){
                if (this.appointment.room == null && this.appointment.doctor){
                    this.appointment.doctor = null;
                    this.appointment.isReal = false;

                    // and release doctor from db
                }
    
                if (this.appointment.room && this.appointment.doctor == null){
                    this.appointment.room = null;
                    this.appointment.isReal = false;

                    // and release room from db
                }
    
                return this;
            }

            getAppointment(){
                return this.appointment;
            }
        }
        return new Builder();
    }
    
    

}

module.exports = Appointment;
