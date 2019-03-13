import React, { Component } from 'react'
import './Consult.css'
import styled from 'styled-components'
import cookie from 'react-cookies'
import { GET, POST, PUT } from './ApiCall'
import 'moment-timezone';
import 'react-dropdown/style.css'
import CartItem from './CartItem'

const moment = require('moment');

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
        background-color: #00A54F;
        box-shadow: inset 0px 0px 19px -8px rgba(0,0,0,1);
    }

    &:hover ${Separator} {
        background-color: #1E591E;
        width: 100%;
      }
    
`

class Cart extends Component {
    constructor (props) {
        super(props)

        this.state={
            cart: [],
        }
    }  

    

    generateInfoByPatientCart(patient){
        
        
        if(patient.cart == undefined){
            alert("You did not save an appointment at this time")
        }else{
            //this.setState({patient.cart}) // <- The real one when Ribal fix the issue
            let cart =[]
        let appointmentObj = {
            clinicId: "5c79642f43d24100061b3283",
            patientId: "123456789",
            date: "28-04-2019",
            blockIds: [3,4,5],
            isAnnual: true,
            paymentInfo:{cardNumber:1}
        }
        cart[0] =appointmentObj
        let yanis = {
            clinicId: "5c79642f43d24100061b3283",
            patientId: "123456789",
            date: "29-04-2019",
            blockIds: [11],
            isAnnual: false,
            paymentInfo:{cardNumber:1}
        }
        cart[1] = yanis
        
        this.setState({cart:cart})
            
        }
    }

    getPatientCart(){
        const user = cookie.load('session')
        GET('/api/patients/'+user.id)
            .then( res =>  res.json())
            .then( res => {
                if (res.success) {
                    this.generateInfoByPatientCart(res.data.patient)
                }
            }
            ).catch(e => {
        })
    }

    componentWillMount(props) {
        this.getPatientCart()
    }
        

    render() {
    const session = cookie.load('session')
    const {cart} = this.state

    return (
    <React.Fragment>

        
     <Navbar>
         <a href="/"> <img alt="" src={require('./res/logo.png')}/></a>
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
            
        <div class= "logged-body">
            <h1>Cart Appointment</h1>
            
            {cart.map(item =><CartItem cartInfo ={cart} info={item}  date={item.date} time={item.blockIds} isAnnual={item.isAnnual}/>)}
        </div>



    </React.Fragment>
        );
    }
}

export default Cart;