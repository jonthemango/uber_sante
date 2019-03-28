const { Get, Post, Put, Delete } = require('./TestModule')
const Patient = require('../models/Patients')

const patient = new Patient({
    healthCardNB:'10009',
    birthDay:"1 january 2019",
    gender:"Male",
    phoneNumber: 5145443322,
    physicalAddress:"123 Street Name",
    email :'email@email.com',
    password :'secret'
})
Post('/api/patients', "Posting Patient", patient,({expect,res})=>{
    expect(res.body.success).to.equal(true)
    const id = res.body.data.patient._id;
    Get('/api/patients/' + id, "Getting Patient by Id",({expect,res})=>{
        expect(res.body.success).to.equal(true);

        const newPatient = patient;
        newPatient.sex = "Female";
        newPatient.phoneNumber = 514555555;
        Put('/api/patients/' + id, "Updating Patient by Id", newPatient, ({expect,res}) =>{
            console.log(res.body.data)
            expect(res.body.data.patient.sex).to.equal("Female");

            Delete('/api/patients/' + id, "Deleting Patient by Id", {}, ({expect,res}) =>{
                expect(res.body.success).to.equal(true);
            });
        });
    })
})

