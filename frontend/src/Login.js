import React, { Component } from 'react'
import styled from 'styled-components'
import { ButtonGroup } from 'react-bootstrap'
import { POST } from './ApiCall'
import cookie from 'react-cookies';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    box-shadow: 0px 0px 39px 9px rgba(214,214,214,0.46);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5%;

    img {
        height: 70px;
        padding-left: 15%;
    }
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;

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
    box-shadow: 0px 0px 1px 1px #00A54F;
    
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
    constructor(props) {
        super(props)
        this.state = {
            user: 1,
            email: '',
            password: '',
            type: '',
            message: '',
            //show : false,
        }
    }

    handleUserOne() {

        //let this.props.setState({show:true});
        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');
        var currBtn4 = document.getElementById('btnLogin');

        //this.setState({show : true})
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #00A54F';
        currBtn1.style.background = '#00A54F';
        currBtn2.style.background = '#00A54F';
        currBtn3.style.background = '#00A54F';
        currBtn4.style.background = '#00A54F';

        this.setState({ type: 'patient' });

        var Access = document.getElementById('AccessInput');
        var AccessP = document.getElementById('AccessLabel');

        Access.placeholder ='Email';
        AccessP.innerHTML='Email';
        // call to database and add the patient tag 


    }

    handleUserTwo() {
        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');
        var currBtn4 = document.getElementById('btnLogin');

        //this.props.show = false;
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #ffb6c1';
        currBtn1.style.background = '#ffb6c1';
        currBtn2.style.background = '#ffb6c1';
        currBtn3.style.background = '#ffb6c1';
        currBtn4.style.background = '#ffb6c1';

        var Access = document.getElementById('AccessInput');
        var AccessP = document.getElementById('AccessLabel');

        Access.placeholder ='Access ID';
        AccessP.innerHTML='Access ID';


        this.setState({ type: 'nurse' });
        // call to database and add the patient tag 
    }

    handleUserThree() {

        var currDisplay = document.getElementById('box');
        var currBtn1 = document.getElementById('btn1');
        var currBtn2 = document.getElementById('btn2');
        var currBtn3 = document.getElementById('btn3');
        var currBtn4 = document.getElementById('btnLogin');
        

        //this.props.show = false;
        currDisplay.style.display = 'grid';
        currDisplay.style.boxShadow = '0px 0px 39px 9px #ffbc00';
        currBtn1.style.background = '#ffbc00';
        currBtn2.style.background = '#ffbc00';
        currBtn3.style.background = '#ffbc00';
        currBtn4.style.background = '#ffbc00';


        var Access = document.getElementById('AccessInput');
        var AccessP = document.getElementById('AccessLabel');

        Access.placeholder ='Email';
        AccessP.innerHTML='Email';

        this.setState({ type: 'doctor' });

        
        // call to database and add the patient tag 


    }

    loginEvent(e) {
        const { email, password, type} = this.state
        POST('/api/login', { email, password , type})
            .then( response =>  response.json())
            .then( response => {
               
            /*   if(type=='nurse'&& /^[a-zA-Z]{3}[0-9]{5}/.test(this.state.email)) {
               alert('ok')}*/
               
                if (response.success) {
                    console.log(response)
                    cookie.save('session', {id: response.user._id, type, token: response.token,email:response.user.email})
                    NotificationManager.success('Logged in!', 'Welcome');
                   if(type!=='doctor') {
                    this.props.history.push('/')
                   }else{
                    this.props.history.push('/doctor')
                   }
                }else{
                    NotificationManager.error('Wrong credentials', 'Try again');
                }
            }
        ).catch(e => {
            NotificationManager.error('Network Error', 'Check backend');
        })
    }

    render() {

        return <Main>
            <Navbar>
                <a href="/"> <img alt="" src={require('./res/logo.png')}/></a>
            </Navbar>  
            <ButtonGroup size="lg" >

                <button id="btn1" className="button" type="button" onClick={this.handleUserOne.bind(this)}>
                    <span>
                        Patient
                </span>
                </button>

                <button id="btn2" className="button" type="button" onClick={this.handleUserTwo.bind(this)}>
                    <span>
                        Nurse
                </span>
                </button>

                <button id="btn3" className="button" type="button" onClick={this.handleUserThree.bind(this)}>
                    <span>
                        Doctor
                </span>
                </button>

            </ButtonGroup ><br/>

            <Box id="box">
                <p id="AccessLabel">Email</p>
                <input onChange={e => this.setState({ email: e.target.value })} placeholder="Email" id="AccessInput" />

                <p>Password</p>
                <input onChange={e => this.setState({ password: e.target.value })} placeholder="Password" type="password" />

                <button id="btnLogin" className="button" type="button" onClick={this.loginEvent.bind(this)}>
                    <span>
                        Login
                </span>
                </button>
            </Box>
        </Main>
    }
}

export default Login;
