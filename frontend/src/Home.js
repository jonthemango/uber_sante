import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import cookie from 'react-cookies';



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
const Btn = props => <a {...props} style={{width: '20vw', textDecoration: 'inherit', color: 'inherit',cursor: 'auto'}}> <Button {...props}>{props.children}</Button> </a>

const slide = keyframes`
    0% {opacity: 0; margin-top: 80px;}
    100% {opacity: 1; margin-top: 0px;}
`
const Button = styled.div`
    cursor: pointer;
    height: 100px;
    width: 20vw;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right:9%;
    margin-top:1%;
    font-size: 1.3rem;
    border-radius: 4px;
    transition: .2s;
    background: linear-gradient(180deg, rgba(255,255,255,0.9990371148459384) -1%, ${({color})=> color || 'rgba(5,153,1,1)'} 100%) white;
    background-position: 0 70px;
    background-repeat: no-repeat;
    font-weight: bold;
    box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.7);
    color: #00A54F;
    animation: ${slide} .3s linear;
    &:hover {
        color: rgba(255,255,255,1);
        background-position: 0 0px; 
        transform: scale(1.1) translateX(-50px); 
        font-size: 1.4rem;
        box-shadow: 20px 0px 10px -5px rgba(0,0,0,0.1);
    }

    img {
        height: 50px;
        width: auto;
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
const Link = styled.div`
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
        background-color: ${({color='#00A54F'}) => color};
        box-shadow: inset 0px 0px 19px -8px rgba(0,0,0,1);
    }

    &:hover ${Separator} {
        background-color: ${({underColor='#1E591E'}) => underColor};
        width: 100%;
      }

     p {

      }
`

const Menu = styled.div`
    display: flex;
    width: 100vw;
    height: 500px;
    flex-direction: column;
    align-items: flex-end;
    background-image: url('https://images.wallpaperscraft.com/image/nurse_white_background_family_80475_1920x1080.jpg'),linear-gradient(90deg, rgba(255,255,255,0) 38%, rgba(255,255,255,1) 49%, rgba(245,255,244,1) 61%, rgba(4,193,0,0.5) 100%);
  
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
    componentDidMount(){
        console.log('token', cookie.load('session'))
    }

    LogOut() {
        cookie.load('session');
        cookie.remove('session');       
    }

  render() {
    const session = cookie.load('session')
    return (
    <React.Fragment>
        <Navbar>
            <img alt="" src={require('./res/logo.png')}/>
            {!session ? <Links>
                <Link>
                    <a href="/login">Sign in</a> 
                    <Separator/>
                </Link>
                <Link>
                    <a href="/SignUp">Sign up</a>
                    <Separator/>
                </Link>
            </Links> : 
            <Links>
                <Link onClick={ _ => cookie.remove('session')} color="#FF6666" underColor="black">
                    <a href="/">Log out</a>
                    <Separator/>
                </Link>
            </Links>}
        </Navbar>
        <Main>
            <Menu>
                <Btn href="/consult"><img alt="" src={"http://www.flambeauswim.com/wp-content/uploads/2015/12/calendar-300x300.png"}/> <p> Make an appointment</p></Btn>
                <Btn href="/calendar">View my file</Btn>
                <Btn href="/calendar">Book a room</Btn>
                <Btn href="/calendar">Contact us</Btn>
            </Menu>
        </Main>
    </React.Fragment>

    
    );
  }
}

export default Home;
