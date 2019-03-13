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
            cart: this.getPatientCart(),
        }
    }  

    getHourByBlockIds(blockId){
        switch(blockId){
            case 0 : return "08h00"
            case 1 : return "08h20"
            case 2 : return "08h40"
            case 3 : return "09h00"
            case 4 : return "09h20"
            case 5 : return "09h40"
            case 6 : return "10h00"
            case 7 : return "10h20"
            case 8 : return "10h40"
            case 9 : return "11h00"
            case 10 : return "11h20"
            case 11 : return "11h40"
            case 12 : return "12h00"
            case 13 : return "12h20"
            case 14 : return "12h40"
            case 15 : return "13h00"
            case 16 : return "13h20"
            case 17 : return "13h40"
            case 18 : return "14h00"
            case 19 : return "14h20"
            case 20 : return "14h40"
            case 21 : return "15h00"
            case 22 : return "15h20"
            case 23 : return "15h40"
            case 24 : return "16h00"
            case 25 : return "16h20"
            case 26 : return "16h40"
            case 27 : return "17h00"
            case 28 : return "17h20"
            case 29 : return "17h40"
            case 30 : return "18h00"
            case 31 : return "18h20"
            case 32 : return "18h40"
            case 33 : return "19h00"
            case 34 : return "19h20"
            case 35 : return "19h40"
        }

    }

    generateInfoByPatientCart(patient){
        if(patient.cart == undefined){
            alert("You did not save an appointment at this time")
        }else{
            return patient.cart
        }
    }

    getPatientCart(){
        const user = cookie.load('session')
        console.log(user)
        
        GET('/api/patients/'+user.id)
            .then( res =>  res.json())
            .then( res => {

                if (res.success) {
                    return this.generateInfoByPatientCart(res.data.patient)
                }
            }
            ).catch(e => {
        })
    }

    componentWillMount() {
        this.setState({cart:this.getPatientCart()})
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
            <h1>Cart</h1>
            {cookie.load('admin') === 'yes'?
                <button class="btn-cart btn btn-success action-bar-btn" type="button" onClick={() => this.handleClickSave()}><i class="fas fa-save"></i> Save</ button>:
                <button class="btn-cart btn btn-success action-bar-btn" type="button" onClick={() => this.handleClickSave()}><i class="fas fa-save"></i> Loan</ button> // add handleClickLoan
            }
            
            {cart.map(item =><CartItem info={item}  date={item.date} time={item.blockIds} isAnnual={item.isAnnual}/>)}
        </div>



    </React.Fragment>
        );
    }
}

export default Cart;