import React, {Component} from 'react'
import styled , {keyframes}from 'styled-components'
import Calendar from './Calendar'
import cookie from 'react-cookies';
import { GET } from './ApiCall'

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
        transform: scale(1.1) translateX(50px); 
        font-size: 1.4rem;
        box-shadow: -20px 0px 10px -5px rgba(0,0,0,0.1);
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
    margin-bottom: 40px;
    img {
        height: 70px;
        padding-left: 15%;
    }
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
`

const Main = styled.div`
      display: grid;
      padding: 10px;
      background-color: 'grey';
      grid-gap: 30px;
      grid-template-areas: 
      "picture     infos      infos"
      "buttons calendar calendar"
      "buttons calendar calendar";
      grid-template-rows: 30vh 70vh;
      grid-template-columns: 30vw 70vh;
      justify-items: stretch;
      align-items: stretch;
`

const PictureArea = styled.div`
      grid-area: picture;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
          height: 300px;
          width: 300px;
          border-radius: 150px;
      }
`

const InfosArea = styled.div`
      grid-area: infos;
      background-color: lightgrey;
      font-family: arial;
      font-size: 1rem;

      div {
          display: flex;
          align-items: center;
      }
`

const ButtonsArea = styled.div`
      grid-area: buttons;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: baseline;
      padding-left: 10%;
      height: 35%;
`

const CalendarArea = styled.div`
      grid-area: calendar;
      max-height: 100%;
`

export default class DoctorHome extends Component {
    constructor(props){
        super(props)

        this.state = {city:"",clinicId:"",email:"",firstname:"",lastname:"",permit:"",specialty:"", availability: {}}


    }

    async componentDidMount(){
        const {id} = cookie.load('session')
        const doctorInfo = await GET(`/api/doctors/${id}`).then(res => res.json())
        this.setState({...doctorInfo.data.doctor})
    }

    render(){
        const {city,clinicId,email,firstname,lastname,permit,specialty, availability} = this.state
        return(
            <React.Fragment>
                <Navbar>
                <a href="/"> <img alt="" href="/" src={require('./res/logo.png')}/> </a>
                    <Links>
                        <Link>
                            <a href="/">Settings</a> 
                            <Separator/>
                        </Link>
                    </Links>
                </Navbar>
                <Main>
                    <PictureArea>
                        <img alt="" src="http://cdn.onlinewebfonts.com/svg/img_491471.png"/>
                    </PictureArea>

                    <InfosArea>
                        <h1>Doctor</h1>
                        <p>{firstname + "  " +  lastname}   </p>                       
                        <div><h2>Specialty:</h2> <p>{specialty}</p></div>
                        <div><h2>Email:</h2> <p>{email}</p></div>
                        <div><h2>City:</h2> <p>{city}</p></div>
                    </InfosArea>
                    
                    <ButtonsArea>
                        <Btn/>
                        <Btn/>
                    </ButtonsArea>
                    
                    <CalendarArea>
                        <Calendar availability={availability} style={{height: 600}}/>
                    </CalendarArea>
                </Main>
            </React.Fragment>
        )
    }
}