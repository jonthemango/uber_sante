import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, } from 'reactstrap';
import {NotificationManager} from 'react-notifications';

export default class AppointmentItem extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {};
    }
    
    componentDidMount(){
        this.setState(({...this.props}))
        console.log(this.state);
        console.log(this.props);
    }

    blockId(ids){
        let res = ""
        let time = [
            "8:00AM","8:20AM","8:40AM",
            "9:00AM","9:20AM","9:40AM",
            "10:00AM","10:20AM","10:40AM",
            "11:00AM","11:20AM","11:40AM", 
            "12:00PM", "12:20", "12:40",
            "1:00PM","1:20PM","1:40PM",
            "2:00PM","2:20PM","2:40PM",
            "3:00PM","3:20PM","3:40PM",
            "4:00PM","4:20PM","4:40PM",
            "5:00PM","5:20PM","5:40PM",
            "6:00PM","6:20PM","6:40PM",
            "7:00PM","7:20PM","7:40PM",
            "8:00PM"
        ]
        if (ids.length == 3){
            let deltaA = time[ids[0]]
            let deltaB = time[ids[2]+1]
            res = deltaA + " to " + deltaB;
        } else {
            let deltaA = time[ids[0]]
            let deltaB = time[ids[0]+1]
            res = deltaA + " to " + deltaB;
        }
        return res;
    }

    patientName(id){
        let patient;
        for (let i=0; i<this.props.patients.length; i++){
            patient = this.props.patients[i];
            if (patient._id == id) break; 
        }
        return patient.firstname + " " + patient.lastname;
    }
    
    render(){
        return (<Card style={{marginBottom: "1em"}}>
            <CardBody>
              <CardTitle><b>{this.props.clinic.name} {this.props.type} appointment</b></CardTitle>
              <CardText><b>Clinic: </b>{this.props.clinic.name}<br></br>
              <b>Date: </b>{this.props.date}<br></br>
              <b>Time: </b>{this.blockId(this.props.blockIds)}<br></br>
              <b>Doctor: </b>{this.props.doctor.firstname} {this.props.doctor.lastname}<br></br>
              <b>Patient: </b>{this.patientName(this.props.patientId)}<br></br>
              <b>Room: </b>{this.props.room}<br></br>
              <b>Type: </b>{this.props.type}<br></br>
              <b>Appointment Id: </b>{this.props._id}<br></br>
              </CardText>
            </CardBody>
          </Card>)
    }
}