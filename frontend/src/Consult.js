import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import cookie from 'react-cookies'
import Calendar from './Calendar'

const Separator = styled.div`
    height: 3px;
    margin-top: -3px;
    width: 0%
    transition: .5s;
    align-self: center;
`
const CalendarArea = styled.div`
      grid-area: calendar;
      max-height: 100%;
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

class Consult extends Component {
    constructor (props) {
        super(props)

        this.state={
            appointment : null,
        }
    }
    
    getAllAppointment(){
        //  
        // cookie.load('session');
        //   Get('/api/clinics/:id/appointments')
        //       .then( response =>  response.json())
        //       .then( response => {
        //          if (response.success) {
        //             this.setState({appointment: response.json.value})
        //          this.createCalendarAvailability()
        //          }else{                  
        //          }
        //      }
        //   ).catch(e => {
        //      NotificationManager.error('Network Error', 'Check backend'); 
        //  Ramez si ca barre enc ouille et que mon code depasse tes foutu comment , wallah cest plu ma faute

    }
    createCalendarAvailability(){
        /*
            
        */
    }
    componentWillMount() {
          //  this.getInfos();
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
            
        <div className="container2">
            <p>Welcome, please select a time slots according to your availabilities!</p>
        </div>
        

        <div className="container">
            <p>Welcome, please select a time slots according to your availabilities!</p>
        </div>
        
        {/* <div>
        <CalendarArea>
            <Calendar/>
        </CalendarArea>
        </div> */}

        </React.Fragment>
        : 
        <React.Fragment>
            
        <div className="container2">
            <p>Find a Consultation in minutes!</p>
        </div>

          <div className="container">
            <span>You need to be registered to the system to be able to consult a doctor !</span> 
            <br/>
            <input type="submit" value="Sign Up" href="/sign"/>
          </div> 
          </React.Fragment>
        }

    </div>
    </React.Fragment>
        );
    }
}

export default Consult;