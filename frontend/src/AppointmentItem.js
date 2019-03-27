import React, { Component } from 'react';
import {PUT, GET, POST, DELETE} from './ApiCall';
import cookie from 'react-cookies'
import swal from 'sweetalert2'    

class AppointmentItem extends Component {
    constructor(){
        super()

        this.state = {
            date : new Date(),
            time : null,
            isAnnual : null,
            logs : null,
            cartInfo : null
        }
    }

    getHourByBlockIds(blockId){
        switch(blockId){
            case 0 : return "08h00"
            case 1 : return "08h20"
            case 2 : return "08h40"
            case 3 : return "09h00"
            case 4 : return "09h20"
            case 5 : return "09h40"
            case 6 : return "10h00"
            case 7 : return "10h20"
            case 8 : return "10h40"
            case 9 : return "11h00"
            case 10 : return "11h20"
            case 11 : return "11h40"
            case 12 : return "12h00"
            case 13 : return "12h20"
            case 14 : return "12h40"
            case 15 : return "13h00"
            case 16 : return "13h20"
            case 17 : return "13h40"
            case 18 : return "14h00"
            case 19 : return "14h20"
            case 20 : return "14h40"
            case 21 : return "15h00"
            case 22 : return "15h20"
            case 23 : return "15h40"
            case 24 : return "16h00"
            case 25 : return "16h20"
            case 26 : return "16h40"
            case 27 : return "17h00"
            case 28 : return "17h20"
            case 29 : return "17h40"
            case 30 : return "18h00"
            case 31 : return "18h20"
            case 32 : return "18h40"
            case 33 : return "19h00"
            case 34 : return "19h20"
            case 35 : return "19h40"
        }

    }

    handleClickRemove(cartInfo,info){

        const session = cookie.load('session')
        console.log('to delete', info)

        DELETE(`/api/appointments/${info._id}`)
            .then( res =>  res.json())
            .then( res => {
                if (res.success) {
                    alert('Deleted !')
                    window.location.reload()
                    console.log('Success', {res})
                }else {
                    alert('An error occured')
                    console.log('No success', {res})
                }
            }
            ).catch(e => {
                alert('Network error')
                console.log('Network error', {e})
            })

    }

    render() {  
        const {cartInfo,info ,date, time, isAnnual } = this.props

        let timeAppointment = this.getHourByBlockIds(time[0]);
        let typeOfAppointment = "20 min Appointment"
        if(isAnnual)
            typeOfAppointment = "1 hour Appointment"
        return (
            <React.Fragment>
            <div class="card search-result">
                <div class="card-header"></div>
            </div>

            <div className="cart-item">
                <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Date: {date}</span> <br/><br/>
                <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Time: {timeAppointment}</span> <br/><br/>
                <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Type: {typeOfAppointment}</span> <br/><br/>
                <button class="cart-btn btn btn-primary" type="button" onClick={() => this.handleClickRemove(cartInfo,info)}> Remove </ button><br/>
            </div>
            </React.Fragment>

        );
    }
}

export default AppointmentItem;