
const axios = require('axios')
const Doctor = require('./models/Doctors')


const Post = (url, obj) => {
    axios.post(url, obj)
        .then(function (response) {
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(function (error) {
            console.log(error);
        });
}

const Delete = (url, obj) => {
    axios.delete(url,obj)
        .then((response)=>{
            console.log(JSON.stringify(response.data,null,2))
        })
        .catch((error)=>{
            console.log(error)
        })
}

const Get = (url) => {
    axios.get(url)
        .then(function (response) {
            console.log(JSON.stringify(response.data, null, data));
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
    gender: "",
    phoneNumber: "",
    physicalAddress: "",
    email: "",
    password: "secret"
}
// post("http://localhost:5001/api/doctors/", doctor);
// const nurse = {

// }

const appointment = {
    clinicId: "5c9bbc69712d950006b36fea",
    patientId: "5c9a9ed758ebbc6a0c37e479",
    date: "2019-04-01",
    blockIds: [9, 10, 11],
    isAnnual: true,
    paymentInfo: { cardNumber: 1 }
}

url = "http://localhost:5001/api/appointments";
obj = appointment

// Post(url,obj)

deleteUrl = "http://localhost:5001/api/appointments/"+"5c9bd075a504d3001095ac91"
Delete(deleteUrl)







