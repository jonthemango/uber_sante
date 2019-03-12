import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import './App.css'
import {Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GET } from './ApiCall';

// Types of calendars: 
// 1- Pick time for appointment
// 2- Set an availability
// 3- View availabilities & appointments

// TODO - Pick week

let img = new Image()
        img.src = "https://i.stack.imgur.com/Vkq2a.png"

const Main = styled.div`
    display: grid;
    grid-template-columns: 10% repeat(5, 18%);
    grid-template-rows: repeat(36, 60px);
    align-items: stretch;
    justify-items: stretch;
    max-height: 80%;
    overflow-y: overlay;
`

const Time = styled.div`
    grid-column: 1;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: 0.2px solid black;
    background-color: #F3F8F3;
`
const Days = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 10% repeat(5, 18%);
    grid-template-rows: 30px;
`

const Day = styled.div`
    width: 100%;
    grid-row: 1;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: 0.2px solid black;
    color: ${({textColor='white'}) =>textColor};
    font-weight: bold;
    background-color: ${({topColor='#197919'}) => topColor};
`
const Slot = styled.div`
    font-size: 1rem;
    cursor:pointer;
    display:flex;
    align-items: center;
    justify-content: center;
    border: 0.1px solid black;
    min-height: 10px;
    background-color: ${props => props.picked ? 'lightgreen' : 'transparent'};
    background-color: ${({color = ''}) => color};
    box-shadow: ${props => props.picked ? 'inset 0px 0px 96px 5px rgba(0,0,0,0.19)' : 'none'};
    overflow: hidden;
    transition: .2s;
    &:hover {
        transform: ${props => props.picked ? 'scale(1.1)' : 'none'};
        border: 2px solid black;
    }
`

const Grid = styled.div`
    grid-area: 1 / 2 / 38 / 7;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(36, 60px);
    background: url("https://www.mafeip.eu/misc/icons/Provider.png"), radial-gradient(ellipse at center, rgba(112,201,107,1) 0%, rgba(255,255,255,1) 52%, rgba(255,255,255,1) 63%);
    background-repeat: no-repeat;
    background-position: center;
`

export default class Calendar extends Component {
    constructor (props) {
        super(props)

        this.state={
            times: this.generateTimes(),
            slots: this.generateSlots(),
            colorA: 'yellow',
            colorB: 'red',
            days: [" "].concat(moment.weekdays().splice(1,5)), // removing sun & fris
            pickedSlot: null
        }
    }



    generateSlots(lowEnd=0, highEnd=36*5){
        let list = [];
        for (let i = lowEnd; i < highEnd; i++) {
            let slot = {id: i}
            list.push(slot);

        }   
        return list;
    }

    // handleSlotClick(x){
    //     x.picked = !x.picked
    //     let {slots} = this.state
    //     slots[x.id]=x
    //     this.setState({slots})
    // }

    async handleSlotClick(x){
        let slot = x.id % 36
        if(!this.props.isDoctor){
            x.picked = !x.picked
            let {slots} = this.state
            slots[x.id]=x
            this.setState({slots})
        }
        
        if(this.props.onSlotClicked){
            this.props.onSlotClicked(slot,x.date);
        }
        if(this.props.isDoctor){
            console.log({x})
            if(x._id){
                const patient = await GET(`/api/patients/${x.patientId}`).then(res=>res.json()).then(res=>res.data.patient)
                const appointmentData = {...x, patient}
                console.log(appointmentData)
                this.setState({appointmentData}, _ => this.setState({showModal: true}))
            } 
        }
        
    }

    getDay(value){
        let slot = value % 36
        let day =  this.state.days[Math.trunc(value / 36)+1]
        return {slot, day}  
    }

    getSlot(day, slot){
        let factor = this.state.days.map(x=> x.toLowerCase()).indexOf(day)-1 
        let value = Number(slot) + 36*Number(factor)
        return value 
    }

    generateTimes(){
        let timeCursor = moment("8:00", "h:mm")
        let times = new Array(36).fill()
        times[0] = timeCursor.format('HH:mm')

        for(let i=1; i<times.length;i++){
            timeCursor = moment(timeCursor).add(20,"minutes")
            times[i] = timeCursor.format('HH:mm')
        }

        return times;
    }




    componentWillReceiveProps(props){
        const { colorA, colorB} = this.state
        const { slots : newSlots , isDoctor = false, date=''} = props
        if(!isDoctor){
            const slots = this.generateSlots()
            try {
                for(let newSlot of newSlots){
                    if(newSlot.slots.length !=0){
                    if(newSlot.slots.length >= 1 && newSlot.slots.length <= 4){
                        newSlots[newSlot.id].picked = true
                        newSlots[newSlot.id].color = colorA
                    } else if(newSlot.slots.length === 5){
                        newSlots[newSlot.id].picked = true
                        newSlots[newSlot.id].color = colorB
                    }
                }
                }
    
                this.setState({slots:newSlots})
            }catch(e) {
                console.log('err', e)
            }
        }else {
            const slots = this.generateSlots()
            let weeklySlots = newSlots[date]
            if(weeklySlots){
                for(let slot of weeklySlots){
                    let gridId = this.getSlot(slot.weekday, slot.blockId)
                    slots[gridId] = {...slot, key: gridId, picked: true, color: slot.type == 'walkin' ? colorA : colorB}
                }
            }
            this.setState({slots})
            
        }
    }

    render(){
        const {style, textColor, topColor} = this.props
        const {showModal, appointmentData} = this.state
        return (
            <div style={{width:'100%', height:'100%',...style, borderRadius: 10}} >
                <Days>
                    { this.state.days.map( x => <Day key={x} textColor={textColor}  topColor={topColor} >{x}</Day>) }
                </Days>
                <Main>
                    { this.state.times.map( x => <Time key={x} >{x}</Time>) }
                    <Grid>
                        {this.state.slots.map( x => <Slot   {...x}
                                                            id={x.id}
                                                            color={x.color}
                                                            key={x.id}
                                                            slots={x.slots}
                                                            date={x.date}
                                                            picked ={x.picked}
                                                            onClick={ _ => this.handleSlotClick(x) }>
                                                    </Slot>
                                            )
                        }
                    </Grid>
                </Main>
                <Modal show={showModal} onHide={ _ => this.setState({showModal: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Patient's Name - { appointmentData ? ((appointmentData.patient.firstname || 'Not Provided') + " " + (appointmentData.patient.lastname || 'Not Provided')) : 'nun'}</p>
                    <p>Patient's Email- { appointmentData ? appointmentData.patient.email : 'Not Provided'}</p>
                    <p>Patient's Phone Number- { appointmentData ? appointmentData.patient.phoneNumber : 'Not Provided'}</p>
                    <p>Patient's Birthday- { appointmentData ? appointmentData.patient.birthDay : 'Not Provided'}</p>
                    <p>Patient's Address- { appointmentData ? appointmentData.patient.physicalAddress : 'Not Provided'}</p>
                    <p>Room Number - <b>#{ appointmentData ? appointmentData.room : 'Not Provided'}</b></p>
                    <p>Appointment Type Number - <b>{ appointmentData ? appointmentData.type : 'Not Provided'}</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ _ => this.setState({showModal: false})}>
                        Ok
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
