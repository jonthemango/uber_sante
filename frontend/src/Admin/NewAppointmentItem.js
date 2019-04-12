import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import {NotificationManager} from 'react-notifications';
const moment = require('moment');

const size=200;

const Main = styled.div`
    width: 100%;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 2em;
    margin-bottom: 1em;
    & p {
        font-weight: bold;
    }

`



class NewAppointmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicId: "",
            patientId: "",
            date: "",
            blockIds: [],
            type: "",
            paymentInfo : { "cardNumber":1 }
        }
        
    }

    componentWillReceiveProps(props){
        this.setState({clinicId: props.clinic._id});
    }

    initState(){
        this.setState({
            clinicId: this.state.clinicId,
            patientId: "",
            date: "",
            blockIds: [],
            type: "",
            paymentInfo : { "cardNumber":1 }
        });
    }

    postAppointment(appointment){
        console.log(appointment)
        if(appointment){
            POST('/api/appointments', appointment)
            .then(response => {
                console.log(response.json());
                let x = response.json().data;
                console.log(x);
                NotificationManager.success("Appointment made")
            })
            .catch( err => {
                NotificationManager.success("Appointment cannot be made")
            })
            .finally(_ => {
                this.initState();
                this.props.reFetch(this.props.clinic._id);
                console.log("Refetching...")
            })
        }
    }

    createPatientSelect(){
        let items = [];
        let item;
        items.push(<option key={""} value={""}>{"---"}</option>)
        for (let i = 0; i < this.props.patients.length; i++) {
            item = this.props.patients[i];
            items.push(<option key={item._id} value={item._id}>{item.firstname + " " + item.lastname}</option>);   
       }
       return items;
    }

    createTimeSelect(){
        let items = [];
        let item;
        let max;
        items.push(<option key={""} value={""}>{"---"}</option>)

        if (this.state.type == "walkin") max = 36;
        else max = 34
        for (let i = 0; i < max; i++) {
            items.push(<option key={i} value={i}>{moment().hour(8).minute(0).add(20*i, 'minutes').format('LT')}</option>);   
       }
       return items;
    }

    

    onTimeSelected(e){
        let blockId = e.target.value;
        console.log(blockId)
        this.setState({blockIds: [blockId]})
        if (this.state.type == "walkin") this.setState({blockIds: [blockId]})
        else this.setState({blockIds: [parseInt(blockId), parseInt(blockId)+1, parseInt(blockId)+2]})
        console.log(this)
    }

    onTypeSelected(e){
        this.setState({type: e.target.value})
    }

    render () {
        const {} = this.state
        
        return <Main ><Form>
            <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <label>Patient</label>
                        <Input type="select" onChange={e => this.setState({patientId: e.target.value})} label="Multiple Select">
                        {this.createPatientSelect()}
                        </Input>
                        
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        <label>Consultation Type</label>
                        <Input type="select" onChange={e => this.onTypeSelected(e)}>
                            <option value="">---</option>
                            <option value="walkin">Walk In</option>
                            <option value="annual">Annual</option>
                        </Input>
                        </FormGroup>
                    </Col>
            </Row>
            <Row>
            <Col md={12}>
                        <FormGroup>
                        <label>Consultation Date</label>
                        <input type="date" value={this.state.date} onChange={e => this.setState({date: e.target.value})}/>

                        </FormGroup>
                    </Col>
            </Row>
            <Row>
                    <Col md={12}>
                        <FormGroup>
                        <label>Appointment Time</label>
                        <Input type="select" onChange={e => this.onTimeSelected(e)} label="Multiple Select">
                        {this.createTimeSelect()}
                        </Input>
                        </FormGroup>
                    </Col>
            </Row>
            <Button onClick={ _ => this.postAppointment(this.state)} color="primary">Consult Appointment</Button>
            </Form></Main>
    }

} 

export default NewAppointmentItem