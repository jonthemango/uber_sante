import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'


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
    constructor (props){
        super (props)
        this.state = {}
    }

    // Function that will add new user to datastore
    registerUser() {
        
    }

    render() {
        return (
     
    <React.Fragment>
    
    <Navbar>
           <a href="/"> <img alt="" src={require('./res/logo.png')}/></a>
            <Links>
                <Link>
                    <a href="/login">Sign in</a> 
                    <Separator/>
                </Link>
                <Link>
                    <a href="/login">Sign up</a>
                    <Separator/>
                </Link>
            </Links>
        </Navbar>
<div class="color">
         <div class="container2">
            <p>Register online and get your appointments on the go !</p>
        </div>


    <div class="container">
                    <div class="row">
                    <label for="Health Card">Health Card Number</label>
                    <input type="text" type="text" placeholder="XXXX-XXXX-XXXX"/>
                    </div>

                    <div class="row">
                        <label for="Birthday">Birthday</label> <input type="text" type="text"/>
                   
                    </div>
        
                    <div class="row">
                        <label for="gender">Gender</label>
                           <select id="gender" name="Gender">
                                <option value="Other">Other</option>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                            </select> 
                     </div>
               
                    <div class="row">
                        <label for="phone">Phone Number</label> 
                        <input type="text" placeholder="XXX-XXX-XXXX" />
                    </div>

                    <div class="row">
                        <label for="email"  >Email</label> 
                        <input type="text" placeholder="email@hotmail.com" />
                    </div>

                    <div class="row">
                        <label for="address">Address</label> 
                        <input type="text" placeholder="1234 Street"/>
                    </div>

                    <div class="submit">
                         <input type="submit" value="Register" onClick={this.registerUser}/>
                    </div>

    </div>
 </div>
    </React.Fragment>
        );
    }
}

export default SignUp;