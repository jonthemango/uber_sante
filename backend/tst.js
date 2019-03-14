const {BusPublisher} = require('event-bus-mini')
const pub = new BusPublisher({port: 7001, name: 'APPOINTMENT PAYMENT BUS'})
pub.publish('paymentPending',({data,logger,client})=>{
    console.log("from within bus",data)
})
bus.start()
