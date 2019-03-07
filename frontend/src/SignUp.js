import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genders from 'array-of-genders'
import {POST} from './ApiCall'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Separator = styled.div`
    height: 3px;
    margin-top: -3px;
    width: 0%
    transition: .5s;
    align-self: center;
`

const Links = styled.div`
    padding-right: 15%;
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
`



const Navbar = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    box-shadow: 0px 0px 39px 9px rgba(214,214,214,0.46);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-botto: 30px;

    img {
        height: 70px;
        padding-left: 15%;
    }

  
`
const Link = styled.a`
    height: 100%;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        color: inherit;
        text-decoration: none; 
        width: 130px;
        height: 100%;
        transition: .2s;
        text-align: justify;
        font-weight: bold;
        color: #00A54F;
        
    }

    a:hover {
        color: white;
        background-color: #00A54F;
        box-shadow: inset 0px 0px 19px -8px rgba(0,0,0,1);
    }

    &:hover ${Separator} {
        background-color: #1E591E;
        width: 100%;
      }
`  

    class SignUp extends Component {
        constructor(props) {
            super(props)
            this.state = {
                birthDay: new Date(),
                healthCardNB:'',
                email:'',
                password:'',
                gender:'Woman',
                phoneNumber:'',
                physicalAddress:'',

            };
        }

        // Function that will add new user to datastore
        registerUser() {
            const {email,password,healthCardNB,birthDay,gender,phoneNumber,physicalAddress} = this.state
            POST('/api/patients',{email,password,healthCardNB,birthDay,gender,phoneNumber,physicalAddress})
                .then(response => response.json())
                .then(response => {
                    if(response.success) {
                        NotificationManager.success('The account was successfully created', 'Success');
                    }
                 }
            )
        }

        render() {
            return (

                <React.Fragment>
                    <Navbar>
                        <a href="/"> <img alt="" src={require('./res/logo.png')} /></a>
                        <Links>
                            <Link>
                                <a href="/login">Sign in</a>
                                <Separator />
                            </Link>
                            <Link>
                                <a href="/login">Sign up</a>
                                <Separator />
                            </Link>
                        </Links>
                    </Navbar>
                    <div className="color">
                        <div className="container2">
                            {/* <p>Register online and get your appointments on the go !</p> */}
                            <div style={{overflow: 'hidden', height: 500}}>
                                <img alt="" style={{height: 550}} src="https://png.pngtree.com/element_origin_min_pic/16/12/10/4caba2d113beb51b0c539836a410edf9.jpg"/>
                            </div>
                        </div>


                        <div className="container">

                             <div className="row">
                                <label for="email"  >Email</label>
                                <input type="text" onChange={e => this.setState({ email: e.target.value })} placeholder="email@hotmail.com" />
                            </div>

                            <div className="row">
                                <label for="address">Password</label>
                                <input type="password" onChange={e => this.setState({ password: e.target.value })}  />
                            </div>

                            <div className="row">
                                <label for="Health Card">Health Card Number</label>
                                <input type="text" onChange={e => this.setState({ healthCardNB: e.target.value })} placeholder="XXXX-XXXX-XXXX" />
                            </div>

                            <div className="row">
                                <label for="Birthday">Birthday</label>
                                <br /> <DatePicker className='date' selected={this.state.birthDay} onChange={birthDay => this.setState({ birthDay })} />
                            </div>

                            <div className="row">
                                <label for="gender">Gender</label>
                                <select defaultValue="Woman" id="gender" name="Gender" onChange={e => this.setState({ gender: e.target.value })}>
                                    <option value="Woman">Woman</option>
                                    <option value="Man">Man</option>
                                    {genders.map(i => <option value={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="row">
                                <label for="phone">Phone Number</label>
                                <input type="text" onChange={e => this.setState({ phoneNumber: e.target.value })} placeholder="XXX-XXX-XXXX" />
                            </div>

                            <div className="row">
                                <label for="address">Address</label>
                                <input type="text" onChange={e => this.setState({ physicalAddress: e.target.value })} placeholder="1234 Street" />
                            </div>

                            <div className="submit">
                                <input type="submit" value="Register" onClick={ e => this.registerUser(e)} />
                            </div>

                        <NotificationContainer/>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

export default SignUp;