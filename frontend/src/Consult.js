import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import cookie from 'react-cookies'
import { GET } from './ApiCall'
import AppointementsCalendar from './AppointementsCalendar'
import DatePicker from "react-datepicker"
import {NotificationManager} from 'react-notifications'
const Separator = styled.div`
    height: 3px;
    margin-top: -3px;
    width: 0%
    transition: .5s;
    align-self: center;
`

const Links = styled.div`
    padding-right: 15%;
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
`

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    box-shadow: 0px 0px 39px 9px rgba(214,214,214,0.46);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img {
        height: 70px;
        padding-left: 15%;
    }


`
const Link = styled.a`
    height: 100%;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        color: inherit;
        text-decoration: none; 
        width: 130px;
        height: 100%;
        transition: .2s;
        text-align: justify;
        font-weight: bold;
        color: #00A54F;
        
    }

    a:hover {
        color: white;
        background-color: #00A54F;
        box-shadow: inset 0px 0px 19px -8px rgba(0,0,0,1);
    }

    &:hover ${Separator} {
        background-color: #1E591E;
        width: 100%;
      }
    
`

const CalendarArea = styled.div`
      grid-area: AppointementsCalendar;
      max-height: 100%;
      width:100%;
`

class Consult extends Component {
    constructor (props) {
        super(props)

        this.state={
            appointment : this.getAllAppointment(),
            date : new Date(),
        }
    }
    
    getAllAppointment(){
        cookie.load('session');
        GET('/api/clinics/5c79642f43d24100061b3283/appointments/')
               .then( res =>  res.json())
               .then( res => {
                  if (res.success) {
                    console.log(res)
                    this.setState({appointment: res.data.appointment})
                  }
                }
                ).catch(e => {
        })

    }

    // Method that will, based on patient's date selection, determine the first day in the same week
    filterCalendarByDate(day) {
        var dayCurrent = day.getDay()
        var firstDayOfWeek = day;

        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayCurrent);
        
        this.createCalendarAvailability(firstDayOfWeek)

        var goodFormat = firstDayOfWeek.toISOString();
        alert(goodFormat)
        alert("YANIS2")
        var testdat = new Date()
        console.log("TESTYANIS",this.state)
        var yanis = this.state
        //testdat.setDate(this.state.appointment[0].date)
        alert(yanis)
        // var lastDayOfWeek = new Date();
        // lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        // lastDayOfWeek.setMonth(lastDayOfWeek.getMonth());
        // alert(lastDayOfWeek);
    }

    // Method that will only filter
    createCalendarAvailability(firstDayOfWeek) {
        // const allAppointments = this.state.appointment;
        // for each appointment, only store the ones after 'firstDayOfWeek' and before ('firstDayOfWeek'+6)
        
        
    }

    componentWillMount() {
        //this.getAllAppointment()
        //this.getInfos();
        this.setState({appointment: this.getAllAppointment()})
    }
        
    /* getInfos() { // dont save until code run
        cookie.load('session');
        //const {} = this.state
        //GET('/api/login', {id, healthCardNB, birthDay, gender, phoneNumber, physicalAdress, email})
        //.then()
    }*/

    render() {
    const session = cookie.load('session')
    return (
     
    <React.Fragment>
     <Navbar>
         <a href="/"> <img alt="" src={require('./res/logo.png')}/></a>
            {!session ? <Links>
                <Link>
                    <a href="/login">Sign in</a> 
                    <Separator/>
                </Link>
                <Link>
                    <a href="/SignUp">Sign up</a>
                    <Separator/>
                </Link>
            </Links> : 
            <Links>
                <Link onClick={ _ => cookie.remove('session')} color="#FF6666" underColor="black">
                    <a href="/">Log out</a>
                    <Separator/>
                </Link>
            </Links>}
        </Navbar>

    <div className="color">
    
      {session ?

        <React.Fragment>
            <br/>
            <div className="container2">
                <p>Welcome, please select a date below according to your availabilities!</p>
                <label for="Birthday">Pick a consultation date</label>
                <br /> 
                <DatePicker className='date' selected={this.state.date} onChange={e => this.filterCalendarByDate(e)} />
                            
            </div>
            <br/>
            <CalendarArea >
                <AppointementsCalendar appointment ={this.state.appointment} style={{height: 600}}/>
            </CalendarArea>

        </React.Fragment>
        : 
        <React.Fragment>
            
            <div className="container2">
                <p>Find a Consultation in minutes!</p>
            </div>

            <div className="container">
                <span>You need to be registered to the system to be able to consult a doctor !</span> 
                <br/>
                <a href="/SignUp">Sign up now</a>
            </div> 
        </React.Fragment>
        }

    </div>
    </React.Fragment>
        );
    }
}

export default Consult;