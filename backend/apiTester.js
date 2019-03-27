
const axios = require('axios')
const Doctor = require('./models/Doctors')


post = (url, obj) => {
  axios.post(url, obj)
  .then(function (response) {
    console.log(JSON.stringify( response.data,null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });
}

get = (url) => {
  axios.get(url)
  .then(function (response) {
    console.log(JSON.stringify( response.data,null, data));
  })
  .catch(function (error) {
    console.log(error);
  });
}


const doctor = {
  "email": "jon",
  "password": "secret",
  "permit": "a random permit",
  "firstname": "ribal",
  "lastname": "aladeeb",
  "specialty": "null",
  "city": "montreal",
  "availability": null,
  "clinicId": ""
};

const patient = {
  healthCardNB: "healthCardNB",
  birthDay: "",
  gender:"",
  phoneNumber:"",
  physicalAddress:"",
  email: "",
  password:"secret"
}
post("http://localhost:5001/api/doctors/", doctor);
const nurse = {

}

const appointment = {
   clinicId:"5c79642f43d24100061b3283",
   patientId: "5c7970367584bf300cc541f4",
   date: "2019-03-01",
   blockIds: [9,10,11],
   isAnnual: true
}

url = "http://localhost:5001/api/appointments";
obj = appointment








