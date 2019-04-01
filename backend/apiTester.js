
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


const clinic = {
    name : "example name",
    rooms : 88
}

Post("http://localhost:5001/api/clinics/", clinic)







