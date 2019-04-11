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



class NewNurseItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            "accessId" : "",
            "firstname": "",
            "lastname": "",
            "birthDay": "",
            "sex": "",
            "phoneNumber": "",
            "physicalAddress": "",
            "email": "",
            "password": "",
            "clinicId": ""
        }
    }

    componentWillReceiveProps(props){
        this.setState({clinicId: props.clinic._id});
    }

    initState(){
        this.setState({
            "accessId": "",
            "firstname": "",
            "lastname": "",
            "birthDay": "",
            "sex": "",
            "phoneNumber": "",
            "physicalAddress": "",
            "email": "",
            "password": "",
            "clinicId": this.state.clinicId
            });
    }

    postNurse(nurse){
        if(true){
            POST('/api/nurses/', nurse)
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
                    <Col md={6}>
                        <FormGroup>
                        <label>Access Id</label>
                        <input type="text" value={this.state.accessId} onChange={e => this.setState({accessId: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        <label>Password</label>
                        <input type="text" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                        </FormGroup>
                    </Col>
            </Row>
            <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <label>Birth Day</label>
                        <input type="date" value={this.state.birthDay} onChange={e => this.setState({birthDay: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    
                    <Col md={6}>
                        <FormGroup>
                        <label>Gender (M or F)</label>
                        <input type="text" value={this.state.sex} onChange={e => this.setState({sex: e.target.value})}/>
                        </FormGroup>
                    </Col>

            </Row>
            <Row form>
                    <Col md={4}>
                        <FormGroup>
                        <label>Physical Address</label>
                        <input type="text" value={this.state.physicalAddress} onChange={e => this.setState({physicalAddress: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                        <label>Phone Number</label>
                        <input type="tel" value={this.state.phoneNumber} onChange={e => this.setState({phoneNumber: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        </FormGroup>
                    </Col>
            </Row>
            <Button onClick={ _ => this.postNurse(this.state)} color="primary">Add nurse</Button>
            </Form></Main>
    }

} 

export default NewNurseItem