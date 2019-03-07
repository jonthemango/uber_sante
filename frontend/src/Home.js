import React, { Component } from 'react'
import styled from 'styled-components'
import Calendar from './Calendar';

const Main = styled.div`
    padding-top: 50px;
`
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

const Button = styled.div`
    cursor: pointer;
    height: 100px;
    width: 25vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:9%;
    margin-top:1%;
    font-size: 1.5rem;
    border-radius: 4px;
    transition: .5s;
    background: linear-gradient(180deg, rgba(255,255,255,0.9990371148459384) 10%, rgba(5,153,1,1) 100%) white;
    background-position: 0 50px;
    background-repeat: no-repeat;
    font-weight: bold;
    box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.7);
    color: #00A54F;
    &:hover {
        color: white;
        background-position: 0 0px; 
        transform: scale(1.2) translateX(-100px); 
        font-size: 2rem;
        text-shadow: 0px 0px .2px rgba(0,0,0,0.98);
        box-shadow: 50px 0px 10px -5px rgba(0,0,0,0.2);

    }
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

const Menu = styled.div`
    display: flex;
    width: 100vw;
    height: 500px;
    flex-direction: column;
    align-items: flex-end;
    background-image: url('https://images.wallpaperscraft.com/image/nurse_white_background_family_80475_1920x1080.jpg'),linear-gradient(90deg, rgba(255,255,255,0) 38%, rgba(255,255,255,1) 49%, rgba(245,255,244,1) 61%, rgba(4,193,0,1) 100%);
  
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;

    button {
        height: 100px;
        width: 200px;
        margin-right:9%;
        margin-top:1%;
    }
    a{
        height: 100px;
        width: 200px;
        margin-right:9%;
        margin-top:1%;
    }
`


class Home extends Component {
  render() {
    return (
    <React.Fragment>
        <Navbar>
            <img alt="" src={require('./res/logo.png')}/>
            <Links>
                <Link>
                    <a href="/Login">Sign in</a> 
                    <Separator/>
                </Link>
                <Link>
                    <a href="/SignUp">Sign up</a>
                    <Separator/>
                </Link>
            </Links>
        </Navbar>
        <Main>
            <Menu>
                <Button href="/Consult">Make an appointment</Button>
                <Button href="/Consult">Request Nurse</Button>
                <Button href="/Consult"></Button>
                <Button href="/Consult"></Button>
            </Menu>
        </Main>
    </React.Fragment>

    
    );
  }
}

export default Home;
