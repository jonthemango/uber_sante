
const axios = require('axios')
const Doctor = require('./models/Doctors')


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
    "monday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "tuesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "wednesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "thursday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    "friday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  }
})
  .then(function (response) {
    console.log(JSON.stringify(response.data, undefined, 2));
  })
  .catch(function (error) {
    console.log(error);
  });




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





