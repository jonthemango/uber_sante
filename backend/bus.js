const {EventBus} = require('event-bus-mini')
const bus = new EventBus({port: 7001, name: 'APPOINTMENT PAYMENT BUS'})
bus.addEvent('paymentPending',({data,logger,client})=>{
    console.log("from within bus",data)
})
bus.start()
