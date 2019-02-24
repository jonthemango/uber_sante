class Patients {
    constructor(healthCardNB,
                birthDay,
                gender,
                phoneNumber,
                physicalAddress,
                email, 
                passwordHash){

        this.healthCardNB = healthCardNB
        this.birthDay = birthDay
        this.gender = gender
        this.phoneNumber = phoneNumber
        this.physicalAddress = physicalAddress
        this.email = email
        this.passwordHash = passwordHash
    }


}

module.exports = Patients;
