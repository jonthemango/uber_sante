const { Get, Post, Put, Delete } = require('./TestModule')
const Doctor = require("../models/Doctors")
const Patient = require("../models/Patients")
const sleep = require('sleep')

let doctor = new Doctor({
    "email": "test@doc.com",
    "password": "doc",
    "city": "Montreal",
    "clinicId": "5c9bbc69712d950006b36fea",
    "firstname": "Jon",
    "lastname": "Mon",
    "permit": "abc",
    "specialty": "General Doctor"
})


// Create a new doctor
Post('/api/doctors', 'new doctor', doctor, ({ expect, res }) => {
    expect(res.body.success).to.equal(true)
    doctor = res.body.data.doctor

    let availability = {
        availability: {
            "monday": {},
            "tuesday": {
                "32": true,
                "33": true,
                "34": true,
                "35": true
            },
            "wednesday": {},
            "thursday": {},
            "friday": {}
        }
    }

    // set availabilities for that new doctor
    Post('/api/doctors/' + doctor._id + '/availability', 'availabilities', availability, ({ expect, res }) => {
        expect(res.body.success).to.equal(true);

        let patient1 = new Patient({
            "email": "testPatient1",
            "password": "testPatient1",
        })
        let patient2 = new Patient({
            "email": "testPatient2",
            "password": "testPatient2"
        })

        // create patient1
        Post('/api/patients/', "make patient 1", patient1, ({ expect, res }) => {
            expect(res.body.success).to.equal(true)
        })

        // fetch the created patient to use his id
        Get('/api/patients/email/' + patient1.email, "fetch patient 1 from db", ({ expect, res }) => {
            expect(res.body.success).to.equal(true)
            patient1 = res.body.data.patient
            const appointment1 = {
                clinicId: "5c9bbc69712d950006b36fea",
                patientId: patient1._id,
                date: "2019-04-05",
                blockIds: [33, 34, 35],
                isAnnual: true,
                paymentInfo: { cardNumber: 1 }
            }

            // try to book the first appointment. The system should be able to book this
            Post('/api/appointments', "make first appointment", { ...appointment1 }, ({ expect, res }) => {



                if (!res.body.success) {
                    // delete the doctor
                    Delete('/api/doctors/' + doctor._id, "delete test doctor", {}, ({ expect, res }) => {
                        expect(res.body.deleted).to.equal(true)
                    })
                    Delete('/api/patients/' + patient1._id, "delete test patient1", {}, ({ expect, res }) => {
                        expect(res.body.success).to.equal(true)
                    })

                    console.log("response from failure:", res.body)
                    expect(false).to.equal(true)
                }


                // make the second patient
                Post('/api/patients/', "make patient 2", patient2, ({ expect, res }) => {
                    expect(res.body.success).to.equal(true)
                })

                Get('/api/patients/email/' + patient2.email, "fetch patient 2 from db", ({ expect, res }) => {
                    expect(res.body.success).to.equal(true)
                    patient2 = res.body.data.patient

                    const appointment2 = {
                        clinicId: "5c9bbc69712d950006b36fea",
                        patientId: patient2._id,
                        date: "2019-04-05",
                        blockIds: [33],
                        isAnnual: false,
                        paymentInfo: { cardNumber: 1 }
                    }

                    Post('/api/appointments/', "make second appointment", appointment2, ({ expect, res }) => {
                        // delete the test patients and test doctor
                        Delete('/api/doctors/' + doctor._id, "delete test doctor", {}, ({ expect, res }) => {
                            expect(res.body.deleted).to.equal(true)
                        })
                        Delete('/api/patients/' + patient1._id, "delete test patient1", {}, ({ expect, res }) => {
                            expect(res.body.success).to.equal(true)
                        })
                        Delete('/api/patients/' + patient2._id, "delete test patient2", {}, ({ expect, res }) => {
                            expect(res.body.success).to.equal(true)
                        })

                        // Get all appointments from the test doctor (there should be a max of two)
                        Get('/api/appointments/' + doctor._id, "fetch appointment", ({ expect, res }) => {
                            expect(res.body.success).to.equal(true)

                            AppointmentList = res.body.data.appointments
                            for (let appoint in AppointmentList) {
                                if (appoint.patientId == patient1._id && appoint.isAnnual == true) {
                                    appointment1 = appoint
                                }
                                if (appoint.patientId == patient2._id && appoint.isAnnual == false) {
                                    appointment2 = appoint
                                }
                            }
                            if (appointment1._id != null) {
                                // delete the first appointment before possibly failing the test
                                Delete('/api/appointments/' + appointment1._id, "delete the first appointment", {}, ({ expect, res }) => {
                                    expect(res.body.success).to.equal(true)
                                })
                            }

                            if (appointment2._id != null) {
                                // idealy you should not enter this block
                                Delete('/api/appointments/' + appointment2._id, "delete the second appointment", {}, ({ expect, res }) => {
                                    expect(res.body.success).to.equal(true)
                                })
                            }

                        })

                        // second appointment creation should not be successful in the first place
                        expect(res.body.success).to.equal(false)
                    })
                })

            })
        })








    })
});
