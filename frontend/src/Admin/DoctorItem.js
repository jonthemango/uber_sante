import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Table, Button } from 'reactstrap';
import {NotificationManager} from 'react-notifications';

export default class DoctorItem extends React.Component {
    state={
        isEditing: false,
        isDeleted: false,
    }
    async update(clinicId){
        this.setState({isEditing: false})
        console.log('update', this.state)
        PUT(`/api/doctors/${this.props._id}`, {...this.state}).then(res => res.json())
        .then(_=> NotificationManager.success('Doctor updated', 'Success'))
        .catch(err => {
                NotificationManager.warning(err);
                console.log('doctor item error',{err})
                return err;
        })
        .finally( _ => {
            this.props.reFetch(clinicId);
        })
    }

    renderComponent(){
        const {isEditing} = this.state
        const {_id, clinicId, firstname, lastname, email , city,  permit, specialty} = this.props
 
        return (<tr>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({firstname: e.currentTarget.textContent})} contentEditable={isEditing}>{firstname}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({lastname: e.currentTarget.textContent})} contentEditable={isEditing}>{lastname}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({email: e.currentTarget.textContent})} contentEditable={isEditing}>{email}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({city: e.currentTarget.textContent})} contentEditable={isEditing}>{city}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({permit: e.currentTarget.textContent})} contentEditable={isEditing}>{permit}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({specialty: e.currentTarget.textContent})} contentEditable={isEditing}>{specialty}</td>

        
        <td><Button color={isEditing ? "secondary" : "primary"} onClick={_ => this.editing()}>Edit</Button></td>
        <td><Button color="success" onClick={ _ => this.update(clinicId) } >Save</Button></td>
        <td><Button color="danger" onClick={ _ => this.delete(clinicId) }>Delete</Button></td>
      </tr>)
    }

    async delete(clinicId){
        DELETE(`/api/doctors/${this.props._id}`)
        .then(response => {
            this.setState({isDeleted: true})
        })
        .catch(err => {
            NotificationManager.warning(err);
        })
        .finally(_=>{
            NotificationManager.success('Doctor Deleted', 'Success');
            this.props.reFetch(clinicId)
        })

    }

    editing(){
        this.setState({isEditing: !this.state.isEditing})
    }

    componentDidMount(){
        this.setState(({...this.props}))
    }
    
    render(){
        return this.state.isDeleted ? null : this.renderComponent();
    }
}