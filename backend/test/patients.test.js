const { Get, Post } = require('./TestModule')
const Patient = require('../models/Patients')

const testName = 'should create a new patient account'
const patient = new Patient({
    healthCardNB:'whatever',
    birthDay:"1 january 2019",
    gender:"non-binary",
    phoneNumber: 5145443322,
    physicalAddress:"cavendish",
    email :'ribal@aladeeb.com',
    passwordHash :'secret'
})
Post('/api/patients',testName, patient,({expect,res})=>{
    expect(res.body.success).to.equal(true)
})