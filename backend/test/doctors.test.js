// const { Get, Post, Put, Delete } = require('./TestModule')
// const Doctor = require('../models/Doctors')

// let doctor = new Doctor({
//     permit: 'a random permit',
//     firstname: 'ribal',
//     lastname: 'aladeeb',
//     city: 'montreal',
// })

// const message = 'should save doctor in db'
// Post('/api/doctors', message, doctor, ({ expect, res }) => {
//     // console.log('response from doctor POST test', res)
//     expect(res.body.success).to.equal(true);

//     doctor = res.body.data.doctor
//     console.log(doctor._id);
//     Get(`/api/doctors/${doctor._id}`, 'doctor should be returned', ({ expect, res }) => {
//         expect(res.body.success).to.equal(true);

//         const newDoctor = doctor;
//         newDoctor.firstname = "Yanis";

//         Put(`/api/doctors/${newDoctor._id}`, 'doctor should be updated', newDoctor, ({ expect, res }) => {

//             expect(res.body.data.doctor.firstname).to.equal(newDoctor.firstname);

//             // Delete the doctor that was just created
//             Delete(`/api/doctors/${doctor._id}`, 'doctor should be deleted', {}, ({ expect, res }) => {
//                 expect(res.body.deleted).to.equal(true)
//             })
//         });
//     });
// });