const persist = require('../persistence')
const { BusSubscriber } = require('event-bus-mini')
const subber = new BusSubscriber({ port: 7001 })



class Payment {
    static isValidPaymentInfo({ paymentInfo }) {
        return { success: true, message: "Payment info is valid" }
    }

    static chargeThePatient( data ) {
        console.log(`Payment has been made for the following appointment: \n${data.appointment}`)
        console.log(`The payment is charged to the following card: ${data.paymentInfo.cardNumber}`)
    }
}

subber.addSubscription('paymentPending', Payment.chargeThePatient)
subber.subscribe()
