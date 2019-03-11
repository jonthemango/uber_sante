import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import cookie from 'react-cookies'
import { GET } from './ApiCall'
import AppointementsCalendar from './AppointementsCalendar'
import DatePicker from "react-datepicker"
import {NotificationManager} from 'react-notifications'
import Moment from 'react-moment';
import 'moment-timezone';

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
                    this.setState({appointment:res.data.appointments})
                  }
                }
                ).catch(e => {
        })

    }

    // Method that will, based on patient's date selection, determine the first day in the same week
    filterCalendarByDate(day) {
        var dayCurrent = day.getDay()
        var firstDayOfWeek = day;
        var lastDayOfWeek;
        var moment = require('moment');

        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayCurrent);
        var firstDay = moment(firstDayOfWeek).format("YYYY/MM/DD");

        alert(firstDay); // sa marche pas de changer le format avec la meme variable so jai du creer celle la

        lastDayOfWeek =  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek =moment(lastDayOfWeek).format("YYYY/MM/DD");

        alert(lastDayOfWeek);

        if(firstDay>lastDayOfWeek){

            alert("SA MARCHE PO");
        } else {

            alert("Ramez  est beau ");
        }

       

        
        this.createCalendarAvailability(firstDayOfWeek)
        console.log(firstDayOfWeek)
        // je veux convertir "firstDayOfWeek" en format "YYYY-MM-DD" 
        // mai yo jon mavait dit on sen fou du format quon send au backend
        // FIrstday = "2019-12-31"
        // last day = "2020-01-07"
        //je veux pas send au backend je veux comparer des dates , je veux savoir si "2019-04-03" > "2019-04-02"
        // en php tu peux le faire so je me dit quie javascript aussi, sinon il faut couper les morceau
        //humm att ok mais le getday live il tle retourne comment, getDay retourn un chiffre de 0->diamanche a 6-? samedi
        // ok ma question plutot cest quoi quon get live ? 
        //filterCalendarByDate(day) { le day ici cest la day que la personne a click dessus 
        //nous on veut voir cest quoi le premier jour de la semaine de cette journer la
        //testdat.setDate(this.state.appointment[0].date)

        /*YANIS : JE REVIENS URGENCE 20H01*/
        
        // var lastDayOfWeek = new Date();
        // lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        // lastDayOfWeek.setMonth(lastDayOfWeek.getMonth());
        // alert(lastDayOfWeek);
    }

    getYearOfDate(date){
        return true
    }
    // Method that will only filter
    //yanis repond a ton cell damn javais aps vu
    
    createCalendarAvailability(firstDayOfWeek) {
        // const allAppointments = this.state.appointment;
        // for each appointment, only store the ones after 'firstDayOfWeek' and before ('firstDayOfWeek'+6)
        console.log("YANIS800",this.state.appointment)
        
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