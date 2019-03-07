import React, { Component } from 'react'
import styled from 'styled-components'
import Button, {ButtonGroup} from 'react-bootstrap'
import {POST,GET} from './ApiCall'

//const auth = require('../../backend/controllers/AuthService')


const Main = styled.div`
    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 100vh;
    justify-items: center;
    align-items: center;

    button {
        height : 50px;
        width : 200px;
        font-family : inherit;
        font-size : 20px;
        background-color : #00A54F;
        border-radius : 4px;
    }
`

const Box = styled.div`
    height: 500px;
    width: 400px;
    border-radius: 2px;
    display: none;
    // background-color: rgba(0,0,0,0.1);
    grid-template-columns: 100%;
    grid-auto-rows: 50px;
    justify-items: center;
    align-items: center;
    padding: 40px;
    grid-gap: 20px;
    box-shadow: 0px 0px 39px 9px #00A54F;
    
    img {
        height: 10px;
    }

    input {
        height: 80%;
        width: 100%;
        border-radius: 2px;
        outline: none;
        padding: 10px
        font-size: inherit;
        font-family: inherit;
    }

    p {
        align-self: left;
        width: 100%;
    }

    button {
        height : 50px;
        width : 200px;
        font-family : inherit;
        font-size : 20px;
        background-color : #00A54F;
        border-radius : 4px;
    }

`

class Login extends Component {
    constructor (props){
        super (props)
        this.state = {
            user : 1,
            email : '',
            password : '',
            type : '',
            //show : false,
        }
    }
 
    handleUserOne() {
        alert('ok you are a patient');
        //let this.props.setState({show:true});
        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');

        //this.setState({show : true})
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #00A54F';
        currBtn1.style.background = '#00A54F';
        currBtn2.style.background = '#00A54F';
        currBtn3.style.background = '#00A54F';
        // call to database and add the patient tag 
        
    } 

    handleUserTwo(){
        alert('ok you are a nurse');
        
        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');

        //this.props.show = false;
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #ffb6c1';
        currBtn1.style.background = '#ffb6c1';
        currBtn2.style.background = '#ffb6c1';
        currBtn3.style.background = '#ffb6c1';
        // call to database and add the patient tag 
    }

    handleUserThree(){
        alert('ok you are a doctor');
        
        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');

        //this.props.show = false;
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #ffbc00';
        currBtn1.style.background = '#ffbc00';
        currBtn2.style.background = '#ffbc00';
        currBtn3.style.background = '#ffbc00';
        // call to database and add the patient tag 
    }

    loginEvent(e){
     
    
    }
    
    render() {
        
        return <Main>
        <img alt="" src={require('./res/logo.png')}/>
        <ButtonGroup size="lg" >

        <button id="btn1" class="button" type="button" onClick={ this.handleUserOne }>
                <span>
                    Patient Login    
                </span>
        </button>

        <button id="btn2" class="button" type="button" onClick={ this.handleUserTwo }>
                <span>
                   Nurse Login    
                </span>
        </button>
       
        <button id="btn3" class="button" type="button" onClick={ this.handleUserThree }>
                <span>
                    Doctor Login    
                </span>
        </button>
        
        </ButtonGroup >
       
        <Box id="box">
            <p>Email</p>
            <input placeholder="Email"/>

            <p>Password</p>
            <input placeholder="Password"/>

            <button class="button" type="button" onClick={ this.loginEvent.bind(this) }>
                <span>
                    LOGIN
                </span>
            </button>
        </Box>
    </Main>
  }
}

export default Login;
