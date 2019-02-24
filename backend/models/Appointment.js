class Appointment {
    constructor(){

    }

    
    static Builder(){
        class Builder {
            constructor() { 
                this.appointment = new Appointment();
            }
    
            buildPatientInfo(patientId, timeData, aptType){
                console.log(this.appointment)

                this.appointment.patientId = patientId;
                this.appointment.timeData = timeData
                this.appointment.aptType = aptType;
                return this;
            }
            
            consumeDoctor(clinicId, timeData, consume){
                console.log(this.appointment)

                this.appointment.doctor = null;
                return this;
            }
            
            consumeRoom(clinicId, timeData, consume){
                console.log(this.appointment)

                this.appointment.room = null;
                return this;
            }
    
            maybeReleaseResources(){
                console.log(this.appointment)
                if (this.appointment.room == null && this.appointment.doctor){
                    this.appointment.doctor = null;
                    // and release doctor
                }
    
                if (this.appointment.room && this.appointment.doctor == null){
                    this.appointment.room = null;
                    // and release room
                }
    
                return this;
            }
            getAppointment(){
                console.log(this.appointment)
                return this.appointment;
            }
        }
        return new Builder();
    }
    
    

}

module.exports = Appointment;
