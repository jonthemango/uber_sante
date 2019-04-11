import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Button, Form, Row, Col, FormGroup } from 'reactstrap';

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



class NewDoctorItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        "email":"",
        "permit":"",
        "firstname":"",
        "lastname":"",
        "specialty":"",
        "city":"",
        "clinicId": "",
        "availability":{}
        }
    }

    componentWillReceiveProps(props){
        this.setState({clinicId: props.clinic._id});
    }

    initState(){
        this.setState({
            "email":"",
            "permit":"",
            "firstname":"",
            "lastname":"",
            "specialty":"",
            "city":"",
            "clinicId": this.state.clinicId,
            "availability":[]
            });
    }

    postDoctor(doctor){
        if(doctor){
            POST('/api/doctors/', doctor)
            .then(response => {
            })
            .catch( err => {
            })
            .finally(_ => {
                this.initState();
                this.props.reFetch(this.props.clinic._id);
            })
        }
    }

    render () {
        const {} = this.state
        
        return <Main ><Form>
            <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <label>First Name</label>
                        <input type="text" value={this.state.firstname} onChange={e => this.setState({firstname: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        <label>Last Name</label>
                        <input type="text" value={this.state.lastname} onChange={e => this.setState({lastname: e.target.value})}/>
                        </FormGroup>
                    </Col>
            </Row>
            <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <label>Permit</label>
                        <input type="text" value={this.state.permit} onChange={e => this.setState({permit: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    
                    <Col md={6}>
                        <FormGroup>
                        <label>Speciality</label>
                        <input type="text" value={this.state.specialty} onChange={e => this.setState({specialty: e.target.value})}/>
                        </FormGroup>
                    </Col>

            </Row>
            <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        <label>City</label>
                        <input type="text" value={this.state.city} onChange={e => this.setState({city: e.target.value})}/>
                        </FormGroup>
                    </Col>
            </Row>
            <Button onClick={ _ => this.postDoctor(this.state)} color="primary">Add Doctor</Button>
            </Form></Main>
    }

} 

export default NewDoctorItem