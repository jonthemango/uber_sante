const {Get} = require('./TestModule')

Get('/','message should say healthy',({expect, res})=>{
    expect(res.body.message).to.equal('healthy')   
})