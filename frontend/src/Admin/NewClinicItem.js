import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Button, Form, Row, Col, FormGroup } from 'reactstrap';

const size=200;

const Main = styled.div`
    width: 100%;
    height: ${size}px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 2em;
margin-bottom: 1em;
    & p {
        font-weight: bold;
    }

`
function postClinic(name,rooms, reFetch, initState){
    if(name && rooms){
        POST('/api/clinics/', {name,rooms})
        .then(response => {
        })
        .catch( err => {
        })
        .finally(_ => {
            initState()
            reFetch()
        })
    }
}



const ClinicItem = ({reFetch, id="", isNew=false, name="none"})=> {
    const [isCreating, setCreating]=useState(false)
    const [newName, setNewName]=useState("")
    const [newRooms, setRooms]=useState("")
    
    const initState = () => {
        setNewName("");
        setRooms("");
    }

    return <Main key={id}><Form><Row form>
                <Col md={6}>
                    <FormGroup>
                    <label>Clinic Name</label>
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <label>Rooms</label>
                    <input type="number" value={newRooms} onChange={e => setRooms(e.target.value)}/>
                    </FormGroup>
                </Col>
        </Row>
        <Button onClick={ _ => postClinic(newName, newRooms, reFetch, initState)} color="primary">Add Clinic</Button>
        </Form></Main>
}

export default ClinicItem