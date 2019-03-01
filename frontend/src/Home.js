import React, { Component } from 'react'
import styled from 'styled-components'

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
                    <a href="/login">Sign in</a> 
                    <Separator/>
                </Link>
                <Link>
                    <a href="/login">Sign up</a>
                    <Separator/>
                </Link>
            </Links>
        </Navbar>
        <Main>
            <Menu>
                 <a href="/Consult"> <button>Consult a Doctor</button> </a>
                <button>Button 3</button>
                <button>Button 4</button>
            </Menu>
        </Main>
        
    </React.Fragment>

    
    );
  }
}

export default Home;
