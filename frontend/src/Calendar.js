import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import './App.css'

// Types of calendars: 
// 1- Pick time for appointment
// 2- Set an availability
// 3- View availabilities & appointments

// TODO - Pick week

let img = new Image()
        img.src = "https://i.stack.imgur.com/Vkq2a.png"

const Main = styled.div`
    display: grid;
    grid-template-columns: 7% repeat(5, 18%);
    grid-template-rows: repeat(36, 60px);
    align-items: stretch;
    justify-items: stretch;
    max-height: 80%;
    overflow-y: scroll;
    background-color: grey;
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
    grid-template-columns: 7% repeat(5, 18%);
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
    color: white;
    font-weight: bold;
    background-color: #197919;
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
    // border: ${props => props.picked ? 'none' : ''};
    box-shadow: ${props => props.picked ? 'inset 0px 0px 96px 5px rgba(0,0,0,0.19)' : 'none'};
    // border-radius: ${props => props.picked ? '3px' : '0px'};
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
            dragging: false,
            draggingOff: false,
            times: this.generateTimes(),
            slots: this.generateSlots(),
            days: ["Slots"].concat(moment.weekdays().splice(1,5)) // removing sun & fri
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

    handleSlotClick(x){
        x.picked = !x.picked
        let {slots} = this.state
        slots[x.id]=x
        this.setState({slots})
    }

    getDay(value){
        let slot = value % 36
        let day =  this.state.days[Math.trunc(value / 36)+1]
        return {slot, day}  
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

    startDragging(e,x){
        if(!x.picked){
            this.setState({dragging: true})
        }else{
            this.setState({draggingOff: true})
        }
        this.handleDragOver(x)
        e.dataTransfer.setDragImage(img, 0, 0)
    }

    handleDragOver(x){
        if(this.state.dragging && !x.picked){
            x.picked = !x.picked
            let {slots} = this.state
            slots[x.id]=x
            this.setState({slots})
        } else if (this.state.draggingOff && x.picked) {
            x.picked = !x.picked
            let {slots} = this.state
            slots[x.id]=x
            this.setState({slots})
        }
    }

    stopDragging(){
        this.setState({dragging: false})
        this.setState({draggingOff: false})
    }

    render(){
        const {width='80%', height=500, style} = this.props
        return (
            <div style={{width, height}} {...style}>
                <Days>
                    { this.state.days.map( x => <Day x key={x} >{x}</Day>) }
                </Days>
                <Main>
                    { this.state.times.map( x => <Time key={x} >{x}</Time>) }
                    <Grid>
                        {this.state.slots.map( x => <Slot   {...x} 
                                                            key={x.id}
                                                            onClick={ _ => this.handleSlotClick(x) }  
                                                            draggable={true} 
                                                            onDragStart={ e => this.startDragging(e, x) } 
                                                            onDragOver={ _ => this.handleDragOver(x) }
                                                            onDragEnd={ _ => this.stopDragging(x) }>
                                                            </Slot>)}
                    </Grid>
                </Main>
            </div>
        )
    }
}
