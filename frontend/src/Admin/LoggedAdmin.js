import React, { Component } from 'react'
import {GET} from '../ApiCall'

class LoggedAdmin extends Component {
    constructor (props) {
        super(props)

        this.state={
            logged: false,
            clinics: [],
        }
    }

    componentDidMount(){
    }

    async fetchClinics(){
        const result = await GET('/api/clinics/')
                                .then(res=> res.json())
                                .catch(e => {
                                    alert('Network error')
                                    console.log('fetching clinic error', {e})
                                    return e
                                })

        if(result.success) {
            let {clinics} = result.data
            this.setState({clinics})
        }
    }

    render() {
        return (
            <div>
                yo
            </div>
        )
        
    }
}

export default LoggedAdmin;
