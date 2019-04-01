import React, { Component, useState} from 'react'
import styled from 'styled-components'

const Main = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 10%;
    & div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 20vw;
        & input,button {
            outline-width: 0;
            padding: 15px;
            width: 100%;
            height: 50px;
            border-radius: 30px;
        }
    }
`


const ClinicItem = ({login})=> {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    
    return <Main>
            <div>
                <h1>Admin</h1>
                <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <button className="btn btn-success" onClick={ _ => name === "admin" && password === "admin" ? login() : null }>Login</button>
            </div>
        </Main>
}

export default ClinicItem