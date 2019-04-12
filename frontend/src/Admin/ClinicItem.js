import React from 'react'
import styled from 'styled-components'

const size=200

const Main = styled.div`
    background-color: white;
    width: ${size}px;
    height: ${size}px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: inset 0px 0px 49px -15px rgba(0,0,0,0);
    transition-duration: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    margin-right: 1em;
    text-align: center;
    &:hover {
        box-shadow: inset 0px 0px 49px -15px rgba(0,0,0,0.75);
    }
    & h1 {
        font-size: 1rem;
        font-weight: bold;
    }
    & p {
    }
`


const ClinicItem = ({choose, _id="", name="No name provided", rooms=[]})=> {

    return <Main className="animated fadeIn" key={_id} onClick={() => choose(_id)}>
                <h1>Clinic Name</h1>
                <p>{name}</p>
                <h1>Rooms</h1>
                <p>{rooms.length}</p>
            </Main>
        
}

export default ClinicItem