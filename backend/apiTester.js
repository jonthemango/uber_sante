
const axios = require('axios')
const Doctor = require('./models/Doctors')
const Cookie = require('./models/Cookies')

const doctor = new Doctor({
  permit: 'a random permit',
  firstname: 'ribal',
  lastname: 'aladeeb',
  city: 'montreal',
});

// axios.post('http://localhost:5001/api/doctors/', doctor)
// .then(function (response) {
//   console.log(JSON.stringify(response.data, undefined, 2));
// })
// .catch(function (error) {
//   console.log(error);
// });

axios.post('http://localhost:5001/api/doctors/5c77b9cd26af576cdb00429c/availability', {
  availability: {
    "monday": [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "tuesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "wednesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "thursday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "friday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  }
})
  .then(function (response) {
    console.log(JSON.stringify({ message: "server responded" }));
  })
  .catch(function (error) {
    console.log(error);
  });


// dummyCookie = new Cookie({
//   doctorId: "5c77b9cd26af576cdb00429c",
//   date: "whatever",
//   day: "thursday",
//   consumed: false
// })

// axios.post('http://localhost:5001/api/cookies', { dummyCookie })
// .then(response => {
// console.log(response)
// console.log("server has responded")
// })
// .catch(error => {
// console.log(error)
// })

// axios.delete('http://localhost:5001/api/cookies')
//   .then(response => {
//     console.log("server has responded")
//   })
//   .catch(error => {
//     console.log("error from server", error)
//   })

  // const noWeeks = 3;
  // let dayObj;
  // let day;
  // let dates = {
  //   "monday":[],
  //   "tuesday":[],
  //   "wednesday":[],
  //   "thursday":[],
  //   "friday":[]
  // };
  // for (let i=0; i<noWeeks*7; i++){
  //   dayObj = moment().add(i,'days'); 
  //   day = dayObj.format('dddd').toLowerCase()
  //   if (day == 'saturday' || day == 'sunday'){ continue; }
  //     dates[day].push(dayObj.format('L'))
  // }





