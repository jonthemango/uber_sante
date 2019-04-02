import React, { Component, useState } from 'react'
import LoginAdmin from './LoginAdmin'
import LoggedAdmin from './LoggedAdmin'


const Admin = (props) => {
    const [logged, setLogged] = useState(false)
    
    return logged ? <LoginAdmin login={_=> setLogged(true)}/> :
                     <LoggedAdmin/>
    
}

export default Admin;
