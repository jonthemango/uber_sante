// const { Get, Post, Put, Delete } = require('./TestModule')
// const Nurse = require('../models/Nurses')

// const nurse = new Nurse({
//     accessId: "ASHS889",
//     password: "secret"});

// Post('/api/nurses', "Posting Nurse", nurse,({expect,res})=>{
//     expect(res.body.success).to.equal(true)
//     const id = res.body.data._id;
//     Get('/api/nurses/' + id, "Getting Nurse by Id",({expect,res})=>{
//         expect(res.body.success).to.equal(true);

//         const newNurse = nurse;
//         newNurse.accessId = "NOAL889";

//         Put('/api/nurses/' + id, "Updating Nurse by Id", newNurse, ({expect,res}) =>{
//             console.log(res.body);
//             expect(res.body.success).to.equal(true);

//             Delete('/api/nurses/' + id, "Deleting Nurse by Id", {}, ({expect,res}) =>{
//                 expect(res.body.deleted).to.equal(true);
//             });
//         });
//     })
// })