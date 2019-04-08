import React, {useState} from 'react'
import styled from 'styled-components'
import { PUT, GET, POST, DELETE } from '../ApiCall';
import { Table, Button } from 'reactstrap';
import {NotificationManager} from 'react-notifications';

export default class NurseItem extends React.Component {
    state={
        isEditing: false,
        isDeleted: false,
    }

    async updateNurse(clinicId){
        this.setState({isEditing: false})
        console.log('nurse update', this.state)
        PUT(`/api/nurses/${this.props._id}`, {...this.state}).then(res => res.json())
        .then(_=> NotificationManager.success('Nurse updated', 'Success'))
        .catch(err => {
                NotificationManager.warning(err);
                console.log('nurse item error',{err})
                return err;
        })
        .finally( _ => {
            this.props.reFetch(clinicId);
        })
    }

    renderComponent(){
        const {isEditing} = this.state
        const {accessId, firstname, lastname, email, clinicId} = this.props
 
        return (<tr>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({firstname: e.currentTarget.textContent})} contentEditable={isEditing}>{firstname}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({lastname: e.currentTarget.textContent})} contentEditable={isEditing}>{lastname}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({accessId: e.currentTarget.textContent})} contentEditable={isEditing}>{accessId}</td>
            <td style={{textAlign: 'center',outline: isEditing ? '1px solid lightgrey':'none'}} onInput={ e => this.setState({email: e.currentTarget.textContent})} contentEditable={isEditing}>{email}</td>
        
        <td><Button color={isEditing ? "secondary" : "primary"} onClick={_ => this.editing()}>Edit</Button></td>
        <td><Button color="success" onClick={ _ => this.updateNurse(clinicId) } >Save</Button></td>
        <td><Button color="danger" onClick={ _ => this.deleteNurse(clinicId) }>Delete</Button></td>
      </tr>)
    }

    async deleteNurse(clinicId){
        DELETE(`/api/nurses/${this.props._id}`)
        .then(response => {
            this.setState({isDeleted: true})
        })
        .catch(err => {
            NotificationManager.warning(err);
        })
        .finally(_=>{
            NotificationManager.success('Nurse Deleted', 'Success');
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