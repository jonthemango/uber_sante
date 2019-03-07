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

class Consult extends Component {
    

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
                    <a href="/sign">Sign up</a>
                    <Separator/>
                </Link>
            </Links>
        </Navbar>
<div className="color">
         <div className="container2">
            <p>Find Consultation in minutes !</p>
        </div>


    <div className="container">
                    <div className="row">
                    <label for="Health Card">Health Card Number</label>
                    <input type="text" placeholder="XXXX-XXXX-XXXX"/>
                    </div>

                    <div className="row">
                        <label for="Birthday">Birthday</label> 
                   
                    </div>
        
                    <div className="row">
                        <label for="gender">Gender</label>
                           <select id="gender" name="Gender">
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="other">Other</option>
                            </select> 
                     </div>
               
                    <div className="row">
                        <label for="phone">Phone Number</label> 
                        <input type="text" placeholder="XXX-XXX-XXXX" />
                    </div>

                    <div className="row">
                        <label for="email"  >Email</label> 
                        <input type="text" placeholder="email@hotmail.com" />
                    </div>

                    <div className="row">
                        <label for="address">Address</label> 
                        <input type="text" placeholder="1234 Street"/>
                    </div>

                    <div className="submit">
                         <input type="submit"   value="Continue"/>
                    </div>

        </div>
    </div>
    </React.Fragment>
        );
    }
}

export default Consult;