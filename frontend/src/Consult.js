import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import cookie from 'react-cookies'
import { GET, POST } from './ApiCall'
import AppointementsCalendar from './AppointementsCalendar'
import DatePicker from "react-datepicker"
import 'moment-timezone';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import VueClockPicker from 'vue-clock-picker'
import { ButtonGroup } from 'react-bootstrap'
const moment = require('moment');
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

const Link = styled.div`
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
            slots: this.generateSlots(),
            datePicked:null,
            appointmentType:null,
            slotSelected:null
        }
    }  

    generateSlots(lowEnd=0, highEnd=36*5){
        let list = [];
        for (let i = lowEnd; i < highEnd; i++) {
            let slot = {id: i,slots:[]}
            list.push(slot);

        }   
        return list;
    }
    
    // Method that will fetch all existing appointments in a specific clinic
    getAllAppointment(){
        cookie.load('session');
        GET('/api/clinics/5c79642f43d24100061b3283/appointments/')
               .then( res =>  res.json())
               .then( res => {
                   console.log("JON",res)
                  if (res.success) {
                    this.setState({appointment:res.data.appointments})
                  }
                }
                ).catch(e => {
        })

    }
    
    // Method that will allow patients to create an appointment
    createAppointment(){

        alert(this.state.datePicked)
        alert(this.state.appointmentType)
        alert(this.state.slotSelected)
        if(this.state.datePicked !=null && this.state.appointmentType !=null && this.state.slotSelected !=null){

            const {id} = cookie.load('session')
            var blockid = []
            var isannual = true
        
            if(this.state.appointmentType == "appointmentType60"){
                blockid.push(this.state.slotSelected)
                blockid.push(this.state.slotSelected + 1)
                blockid.push(this.state.slotSelected + 2)
            }else{
                blockid.push(this.state.slotSelected)
                isannual = false
            }

            POST('/api/appointments/', {
                clinicId: "5c79642f43d24100061b3283",
                patientId: id,
                date: this.state.datePicked,
                blockIds: blockid,
                isAnnual: isannual,
            })
               .then( res =>  res.json())
               .then( res => {
                    if (res.success) {
                        alert("Appointment Succesfully Created!!")
                        this.setState({appointment:res.data.appointment})
                    }
                    else
                        console.log('something went terribly wrong')
                })
                .catch(e => {
                    console.log('Error')
            })

        }
        else{
            alert("You did not pick a day/Type/Slot")
        }

    }   
    // Method that will, based on patient's date selection, determine the first day in the same week
    filterCalendarByDate(day) {
        
        var dayCurrent = day.getDay()
        var firstDayOfWeek = day;
        var lastDayOfWeek;

        var dayGoodFormat = moment(day).format("YYYY-MM-DD");

        this.setState({datePicked:dayGoodFormat});

        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayCurrent);
        var firstDay = moment(firstDayOfWeek).format("YYYY-MM-DD");

        lastDayOfWeek =  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek = moment(lastDayOfWeek).format("YYYY-MM-DD");

        this.createCalendarAvailability(firstDay,lastDayOfWeek)

    }

    getYearOfDate(date){
        return true
    }
    // Method that will only filter
    //yanis repond a ton cell damn javais aps vu /on est LAAA
    
    createCalendarAvailability(firstDayOfWeek,lastDayOfWeek) {
        console.log(1111)
        var list = [];
        for (let i = 0; i < 180; i++) {
            let slot = {id: i,slots:[]}
            list.push(slot);
        }
        console.log(2222);
        console.log(this.state.appointment)
        for (let i = 0; i < this.state.appointment.length; i++) {
            if(this.state.appointment[i].date > firstDayOfWeek && this.state.appointment[i].date < lastDayOfWeek){
                var dayOfTheAppointment = parseInt(moment(this.state.appointment[i].date).day())-1;
                for (let x = 0; x< this.state.appointment[i].blockIds.length; x++) {
                    list[this.state.appointment[i].blockIds[x]+(36*dayOfTheAppointment)].slots.push(this.state.appointment[i])
                }
            }
        }


        this.setState({slots: list.filter(x => x.slots.length !== 0)});
    }

    handleSlotPicked(slot){
        console.log("YANISPOST",slot)
        this.setState({slotSelected:slot})
    }

    componentWillMount() {
        //this.getAllAppointment()
        //this.getInfos();
        this.setState({appointment: this.getAllAppointment()})
    }
        

    render() {
    const session = cookie.load('session')
    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]
    const defaultOption = options[0]

    
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
                <label>Pick a consultation date</label>
                <br /> 
                <DatePicker  className='date' selected={this.state.date} onChange={e => this.filterCalendarByDate(e)} />

                <br />
                <br />
                <p>Do you wish to book a 20min or a 1h consultation ?</p>
                <RadioGroup onChange={value=>this.setState({appointmentType:value})} >
                    <RadioButton value="appointmentType20">20 min walk-in</RadioButton>
                    <RadioButton value="appointmentType60">1h annual check-up</RadioButton>
                </RadioGroup>

                <p>Choose the starting slot in the calendar</p>
                
                <button className="button" id = "appointmentSave" onClick={ _ => this.createAppointment() }> Book Appointment</button>
                
                            
            </div>
            <br/>
            <CalendarArea>
                <AppointementsCalendar onSlotClicked={ slot => this.handleSlotPicked(slot) } slots={this.state.slots} style={{height: 600}}/>
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