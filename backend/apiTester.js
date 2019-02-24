
const axios = require('axios')

// Optionally the request above could also be done as

axios.post('http://localhost:3003/', {
    clinicId:1,
    patientId:1,
    timeData: { block: 20, date: "YYYY-DD-MM"},
    isAnnual: true,
    consume: true
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data, undefined, 2));
  })
  .catch(function (error) {
    console.log(error);
  });




