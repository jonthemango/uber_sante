
const axios = require('axios')

// Optionally the request above could also be done as

axios.get('http://localhost:5001/api/patients/9')
  .then(function (response) {
    console.log(JSON.stringify(response.data, undefined, 2));
  })
  .catch(function (error) {
    console.log(error);
  });




