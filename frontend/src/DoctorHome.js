import React, {Component, useState} from 'react'
import styled , {keyframes}from 'styled-components'
import Calendar from './Calendar'
import AppointementsCalendar from './AppointementsCalendar'
import cookie from 'react-cookies';
import { GET, POST } from './ApiCall'
import moment from 'moment'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Btn = props => <a onClick={null} style={{width: '20vw', textDecoration: 'inherit', color: 'inherit',cursor: 'auto'}}> <Button {...props}>{props.children}</Button> </a>

const slide = keyframes`
    0% {opacity: 0; margin-top: 80px;}
    100% {opacity: 1; margin-top: 0px;}
`

const ButtonsArea = styled.div`
      grid-area: buttons;
      display: flex;
      flex-direction: column;
      justify-content: top;
      padding-left: 10%;
      padding-top: 15%;
`

const Button = styled.div`
    cursor: pointer;
    height: 100px;
    width: 20vw;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right:9%;
    margin-top:1%;
    font-size: 1.3rem;
    border-radius: 4px;
    transition: .2s;
    background: linear-gradient(180deg, rgba(255,255,255,0.9990371148459384) -1%, ${({backColor})=> backColor || 'rgba(5,153,1,1)'} 100%) white;
    background-position: 0 70px;
    background-repeat: no-repeat;
    font-weight: bold;
    box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.7);
    color: #00A54F;
    animation: ${slide} .3s linear;
    &:hover {
        color: rgba(255,255,255,1);
        background-position: 0 0px; 
        transform: scale(1.1) translateX(50px); 
        font-size: 1.4rem;
        box-shadow: -20px 0px 10px -5px rgba(0,0,0,0.1);
    }

    img {
        height: 50px;
        width: auto;
    }
`

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    box-shadow: 0px 0px 39px 9px rgba(214,214,214,0.46);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    img {
        height: 70px;
        padding-left: 15%;
    }
    a {
        padding-left: 15%;
    }
`

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
    justify-content: center;
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
        padding-left: 0%;
    }

    a:hover {
        color: white;
        background-color: ${({color='#00A54F'}) => color};
        box-shadow: inset 0px 0px 19px -8px rgba(0,0,0,1);
    }

    &:hover ${Separator} {
        background-color: ${({underColor='#1E591E'}) => underColor};
        width: 100%;
      }
`

const DateSwitch = ({onCurrentDateChange=console.log}) => {
    const [currentDate, setDate] = useState(moment().weekday(1))

    return (
        <DateArea>
            <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Caret_left_font_awesome.svg/2000px-Caret_left_font_awesome.svg.png" 
                    onClick={ _ => {
                        const new_date = currentDate.clone().subtract(1, 'week');
                        setDate(new_date); 
                        onCurrentDateChange(new_date.format('YYYY-MM-DD')); }}/>
            <div>Week of: <h1> {currentDate.format('YYYY-MM-DD')} </h1></div>
            <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Caret_left_font_awesome.svg/2000px-Caret_left_font_awesome.svg.png" 
                    onClick={ _ => {
                        const new_date = currentDate.clone().add(1, 'week');
                        setDate(new_date); 
                        onCurrentDateChange(new_date.format('YYYY-MM-DD')); }}/>
        </DateArea>
    )

}


const DateArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        height: 50px;
        width: 50px;
        cursor: pointer;
        transition: .3s;
    }

    & img:hover {
        transform: scale(1.5);
    }

    & img:nth-child(3) {
        transform: rotate(180deg);
    }

    & img:hover:nth-child(3) {
        transform: rotate(180deg) scale(1.5);
    }

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & h1 {
        margin-left: 10px;
        font-family: Garamond;
    }
`

const Main = styled.div`
      display: grid;
      padding: 10px;
      background-color: 'grey';
      grid-gap: 30px;
      grid-template-areas: 
      "picture     infos      infos"
      "buttons calendar calendar"
      "buttons calendar calendar";
      grid-template-rows: 250px 70vh;
      grid-template-columns: 30vw 70vh;
      justify-items: stretch;
      align-items: stretch;
`

const PictureArea = styled.div`
      grid-area: picture;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
          height: 220px;
          width: 220px;
          border-radius: 110px;
          box-shadow: 0px 0px 10px 1px rgba(0,0,0,.2);
      }
`

const InfosArea = styled.div`
      grid-area: infos;
      font-size: 12px;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      color: white;
      
      & h1 {
          font-weight: bold;
          font-size: 40px;
          padding: 0;
      }

      & p {
        padding: 10px;
        font-size: 20px;
        margin-bottom: 0;
      }

      & h2 {
        font-size: 30px; 
        font-weight: normal;
      }

      & h3 {
         font-weight: bold;
      }

      & div {
          display: flex;
          align-items: center;
      }

      & span {
          display: flex;
          width: 100%;
          padding: 10px;
          justify-content: space-between;
          color: white;
          background-color: rgba(0,0,0,.5);
          border-radius: 5px;
          border: 1px solid black;
      }
`

const HeadBackground = styled.div`
    grid-row: 1 ;
    grid-column: 1 / 3;
    background: url('http://demo.geekslabs.com/materialize/v2.3/layout03/images/user-profile-bg.jpg');
    background-width: 100%;
`
const CalendarArea = styled.div`
      grid-area: calendar;
      max-height: 100%;
`

export default class DoctorHome extends Component {
    constructor(props){
        super(props)

        this.state = {city:"",
                        clinicId:"",
                        email:"",
                        firstname:"",
                        lastname:"",
                        permit:"",
                        specialty:"", 
                        availability: {}, 
                        rawAvailabilitites: [], 
                        displayAvailabilities: true,
                        slots: [],
                        days: moment.weekdays().splice(1,5).map(x => x.toLowerCase())}


    }

    getDay(value){
        let slot = value % 36
        let day =  this.state.days[Math.trunc(value / 36)]
        return {slot, day}  
    }

    async updateAvailabilities(){
        const slots = cookie.load('slots')
        if(slots){
            const {id} = cookie.load('session')
            const newAvailabilities = slots.map(x => x.id).map(x => this.getDay(x))
            let availability = {}
    
            for(let day of this.state.days){
                availability[day] = {}
            }
    
            for(let item of newAvailabilities){
                let {day, slot} = item
                availability[day][slot]=true;
            }
    
            availability = {availability}
    
            const response = await POST(`/api/doctors/${id}/availability`,availability).then(res=>res.json())
    
            if(response.success){
                NotificationManager.success('Availabilities updated', 'Success');
            }
        }
    }

    async componentDidMount(){
        const {id} = cookie.load('session')
        const doctorInfo = await GET(`/api/doctors/${id}`).then(res => res.json())
        this.setState({...doctorInfo.data.doctor})
        let slots = []

        const result = await GET(`/api/doctors/${id}/appointments`).then(res => res.json())
        if(result.success){
            for(let appointment of result.data.appointments){
                for(let id of appointment.blockIds){
                    let firstWeekDay = moment(appointment.date,'YYYY-MM-DD').weekday(1).format('YYYY-MM-DD')
                    let formatedAppointment = {_id: appointment._id, weekday: moment(appointment.date, 'YYYY-MM-DD').format('dddd').toLowerCase() , date: appointment.date, patientId: appointment.patientId, room: appointment.room, type: appointment.type, blockId: id }
                    if(slots[id])
                        slots[firstWeekDay].push(formatedAppointment)
                    else
                        slots[firstWeekDay] = [formatedAppointment]
                    }
            }
        }

        this.setState({slots})
    }

    render(){
        const {city,email,firstname,lastname,specialty, availability,displayAvailabilities} = this.state
        return(
            <React.Fragment>
                <Navbar>
                    <a href="/">
                        <img alt="" href="/" src={require('./res/logo.png')}/> 
                    </a>
                    <Links>
                        <Link>
                            <a href="/">Settings</a> 
                            <Separator/>
                        </Link>
                    </Links>
                </Navbar>
                <Main>
                    <HeadBackground/>
                    <PictureArea>
                        <img alt="" src="https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png"/>
                    </PictureArea>

                    <InfosArea>
                        <h1>Doctor</h1>
                        <h2>{`${firstname} ${lastname}`}</h2>  
                        <span>
                            <div><h3>Specialty: </h3> <p>{specialty}</p></div>
                            <div><h3>Email: </h3> <p>{email}</p></div>
                            <div><h3>City: </h3> <p>{city}</p></div>
                        </span>                     
                    </InfosArea>
                    
                    <ButtonsArea>
                        <Btn onClick={ _ => this.setState({displayAvailabilities: true})}>
                            Display Availabilities
                        </Btn>
                        <Btn backColor="#0000B3" onClick={ _ => this.updateAvailabilities() }>
                            Update Availabilities
                        </Btn>
                        <Btn backColor="#e18514" onClick={ _ => this.setState({displayAvailabilities: false})}>
                            Display Appointments
                        </Btn>
                    </ButtonsArea>
                    
                    <CalendarArea>
                                <DateSwitch onCurrentDateChange={ date => this.setState({date})} />
                                <Calendar availability={availability} style={{height:  displayAvailabilities ?600:0, opacity: displayAvailabilities ?1:0, }}/> 
                                <AppointementsCalendar textColor="black" topColor="#FFA500" date={this.state.date} isDoctor slots={this.state.slots} style={{height: 600, opacity: !displayAvailabilities ?1:0}}/>
                    </CalendarArea>
                </Main>
                <NotificationContainer/>
            </React.Fragment>
        )
    }
}