import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Table, Button } from 'reactstrap';
import {NotificationManager} from 'react-notifications';

export default class PatientItem extends React.Component {
    state={
        isEditing: false,
        isDeleted: false,
    }
    async updatePatient(){
        this.setState({isEditing: false})
        console.log('update', this.state)
        PUT(`/api/patients/${this.props._id}`, {...this.state}).then(res => res.json())
        .then(_=> NotificationManager.success('Patient updated', 'Success'))
        .catch(err => {
                NotificationManager.warning(err);
                console.log('patient item error',{err})
                return err;
        })
        .finally( _ => {
            this.props.reFetch();
        })
    }

    renderComponent(){
        const {isEditing} = this.state
        const {_id, firstname, lastname, birthDay,sex, phoneNumber, physicalAddress, email} = this.props
 
        return (<tr>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({firstname: e.currentTarget.textContent})} contentEditable={isEditing}>{firstname}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({lastname: e.currentTarget.textContent})} contentEditable={isEditing}>{lastname}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({birthDay: e.currentTarget.textContent})} contentEditable={isEditing}>{birthDay}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({sex: e.currentTarget.textContent})} contentEditable={isEditing}>{sex}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({phoneNumber: e.currentTarget.textContent})} contentEditable={isEditing}>{phoneNumber}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({physicalAddress: e.currentTarget.textContent})} contentEditable={isEditing}>{physicalAddress}</td>
            <td style={{textAlign: 'left',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({email: e.currentTarget.textContent})} contentEditable={isEditing}>{email}</td>
        
        <td><Button color={isEditing ? "secondary" : "primary"} onClick={_ => this.editing()}>Edit</Button></td>
        <td><Button color="success" onClick={ _ => this.updatePatient() } >Save</Button></td>
        <td><Button color="danger" onClick={ _ => this.deletePatient() }>Delete</Button></td>
      </tr>)
    }

    async deletePatient(){
        DELETE(`/api/patients/${this.props._id}`)
        .then(response => {
            this.setState({isDeleted: true})
        })
        .catch(err => {
            NotificationManager.warning(err);
        })
        .finally(_=>{
            NotificationManager.success('Patient Deleted', 'Success');
            this.props.reFetch()
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