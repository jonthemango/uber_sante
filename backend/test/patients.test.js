const { Get, Post, Put, Delete } = require('./TestModule')
const Patient = require('../models/Patients')

const patient = new Patient({
    healthCardNB:'10009',
    birthDay:"1 january 2019",
    gender:"Male",
    phoneNumber: 5145443322,
    physicalAddress:"123 Street Name",
    email :'email@email.com',
    passwordHash :'secret'
})
Post('/api/patients', "Posting Patient", patient,({expect,res})=>{
    expect(res.body.success).to.equal(true)
    const id = res.body.data._id;
    Get('/api/patients/' + id, "Getting Patient by Id",({expect,res})=>{
        expect(res.body.success).to.equal(true);

        const newPatient = patient;
        newPatient.gender = "Female";
        newPatient.phoneNumber = 514555555;
        Put('/api/patients/' + id, "Updating Patient by Id", newPatient, ({expect,res}) =>{
            console.log(res.body);
            expect(res.body.success).to.equal(true);

            Delete('/api/patients/' + id, "Deleting Patient by Id", {}, ({expect,res}) =>{
                expect(res.body.deleted).to.equal(true);
            });
        });
    })
})

