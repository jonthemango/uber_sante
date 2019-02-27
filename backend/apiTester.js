
const axios = require('axios')

// Optionally the request above could also be done as

// axios.post('http://localhost:5001/api/doctors/5c75c3afad74522637fc2561/availability', {
//   availability: {
//     "monday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
//     "tuesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
//     "wednesday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
//     "thursday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
//     "friday": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
//   }
// })
//   .then(function (response) {
//     console.log(JSON.stringify(response.data, undefined, 2));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const Doctor = require('./models/Doctors')
// console.log(Doctor);
const doctor = new Doctor({
  permit: 'a random permit',
  firstname: 'ribal',
  lastname: 'aladeeb',
  city: 'montreal',
})
axios.post('http://localhost:5001/api/patients', doctor)
  .then(function (response) { console.log(JSON.stringify(response.data, undefined, 2)); })
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





