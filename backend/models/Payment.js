const persist = require('../persistence')
const { BusSubscriber } = require('event-bus-mini')
const logger = require('../logs')
const subber = new BusSubscriber({ port: 7001 })



class Payment {
    static isValid(paymentInfo) {
        if  (paymentInfo == undefined || paymentInfo.cardNumber == undefined){
            return false
        }
        return true
    }

    static chargeThePatient(data) {
        console.log("\n")
        logger("")
        console.log(`Payment has been made for the following appointment: \n`,data.appointment)

        console.log("\n")
        logger("")
        console.log(`The payment is charged to the following card: `,data.paymentInfo.cardNumber)
    }
}

subber.addSubscription('paymentPending', Payment.chargeThePatient)
subber.subscribe()

module.exports = Payment
