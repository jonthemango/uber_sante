import React, { Component } from 'react';
import { PUT, GET, POST, DELETE } from './ApiCall';
import cookie from 'react-cookies'
import swal from 'sweetalert2'

class CartItem extends Component {
    constructor() {
        super()

        this.state = {
            date: new Date(),
            time: null,
            isAnnual: null,
            logs: null,
            cartInfo: null
        }
    }

    getHourByBlockIds(blockId) {
        switch (blockId) {
            case 0: return "08h00"
            case 1: return "08h20"
            case 2: return "08h40"
            case 3: return "09h00"
            case 4: return "09h20"
            case 5: return "09h40"
            case 6: return "10h00"
            case 7: return "10h20"
            case 8: return "10h40"
            case 9: return "11h00"
            case 10: return "11h20"
            case 11: return "11h40"
            case 12: return "12h00"
            case 13: return "12h20"
            case 14: return "12h40"
            case 15: return "13h00"
            case 16: return "13h20"
            case 17: return "13h40"
            case 18: return "14h00"
            case 19: return "14h20"
            case 20: return "14h40"
            case 21: return "15h00"
            case 22: return "15h20"
            case 23: return "15h40"
            case 24: return "16h00"
            case 25: return "16h20"
            case 26: return "16h40"
            case 27: return "17h00"
            case 28: return "17h20"
            case 29: return "17h40"
            case 30: return "18h00"
            case 31: return "18h20"
            case 32: return "18h40"
            case 33: return "19h00"
            case 34: return "19h20"
            case 35: return "19h40"
        }

    }

    updateUser(user) {
        PUT('/api/patients/' + user._id, { ...user })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    window.location.reload()
                }
                else {
                    alert("A probleme occured when saving to your information / Please try again")
                }
            })
            .catch(e => {
                console.log('Error')
            })
    }

    handleClickRemove(cartInfo, info) {

        const session = cookie.load('session')

        GET('/api/patients/' + session.id)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    let filterCart = cartInfo.filter(function (ele) {
                        return ele != info;
                    });
                    let user = res.data.patient
                    user.cart = filterCart
                    this.updateUser(user)
                }
            }
            ).catch(e => {
            })

    }

    handleClickSave(cartInfo, info) {
        // chechout form
        console.log('cart info', { cartInfo, info })
        const { value: formValues } = swal.fire({
            title: 'Checkout Cart',
            html:
                '<label>Credit Card Number</label><input id="swal-input1" class="swal2-input">' +
                '<label>Security Number (3 Numbers)</label><input id="swal-input1" class="swal2-input">' +
                '<label>Expiration Date</label> <p><select> <option value="january">January</option><option value="february">February</option><option value="mars">Mars</option><option value="april">April</option><option value="may">May</option><option value="june">June</option><option value="july">July</option><option value="august">August</option><option value="september">September</option><option value="october">October</option><option value="november">November</option><option value="december">December</option></select><select> <option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option></select></p>',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    POST('/api/appointments/', {
                        clinicId: info.clinicId,
                        patientId: info.patientId,
                        date: info.date,
                        blockIds: info.blockIds,
                        isAnnual: info.isAnnual,
                        paymentInfo: info.paymentInfo
                    }).then(res => res.json())
                        .then(res => {
                            console.log('res', { res })
                            if (res.success) {
                                this.handleClickRemove(cartInfo, info)
                                this.btn.setAttribute("disabled", "disabled") // disables button
                                alert("Appointment Succesfully Created!!")
                            }
                            else { // bug
                                alert("Appointment not Created!! Appointment not available at this time ")
                                this.btn.setAttribute("disabled", "disabled")
                                console.log('something went terribly wrong')
                            }

                        })
                        .catch(e => {
                            console.log('Error', e)
                        })


                ]
            }
        })


    }

    // Method to cancel an appointment
    handleClickDelete(cartInfo, info) {
        alert('deleting appointment...')
        //DELETE('api/appointments'+ appointment_id)
        // .then()
    }

    render() {
        const { cartInfo, info, date, time, isAnnual } = this.props

        let timeAppointment = this.getHourByBlockIds(time[0]);
        let typeOfAppointment = "20 min Appointment"
        if (isAnnual)
            typeOfAppointment = "1 hour Appointment"
        return (
            <React.Fragment>
                <div class="card search-result">
                    <div class="card-header"></div>
                </div>

                <div className="cart-item">
                    <span style={{ marginLeft: 10, fontFamily: 'Arial' }}>  Date: {date}</span> <br /><br />
                    <span style={{ marginLeft: 10, fontFamily: 'Arial' }}>  Time: {timeAppointment}</span> <br /><br />
                    <span style={{ marginLeft: 10, fontFamily: 'Arial' }}>  Type: {typeOfAppointment}</span> <br /><br />
                    <button class="cart-btn btn btn-primary" type="button" onClick={() => this.handleClickRemove(cartInfo, info)}> Remove </ button><br />
                </div>
                <button ref={btn => { this.btn = btn; }} class="btn-cart btn btn-success action-bar-btn" type="button" onClick={() => this.handleClickSave(cartInfo, info)}><i class="fas fa-save"></i> Checkout</ button><br />
                <button type="button" onClick={() => this.handleClickDelete(cartInfo, info)}>Cancel Appointment</ button>
            </React.Fragment>

        );
    }
}

export default CartItem;
