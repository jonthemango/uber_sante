import React, { Component, useState } from 'react'
import LoginAdmin from './LoginAdmin'
import LoggedAdmin from './LoggedAdmin'


const Admin = (props) => {
    const [logged, setLogged] = useState(false)
    
    return logged ? <LoggedAdmin/> :<LoginAdmin login={_=> setLogged(true)}/>
    
    
}

export default Admin;
