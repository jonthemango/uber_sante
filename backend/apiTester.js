
const axios = require('axios')

// Optionally the request above could also be done as

axios.put('http://localhost:5001/api/patients/5c74ac49765e71617070348a',{
  healthCardNB:'whatever',
  birthDay:"1 january 2019",
  gender:"non-binary",
  phoneNumber: 5145443322,
  physicalAddress:"cavendish",
  email :'ribal@aladeeb.com',
  passwordHash :'secret'
})
  .then(function (response) {
    console.log(JSON.stringify(response.data, undefined, 2));
  })
  .catch(function (error) {
    console.log(error);
  });






