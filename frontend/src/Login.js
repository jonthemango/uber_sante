import React, { Component } from 'react'
import styled from 'styled-components'

const Main = styled.div`
    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 100vh;
    justify-items: center;
    align-items: center;
`

const Box = styled.div`
    height: 500px;
    width: 400px;
    border-radius: 2px;
    display: grid;
    // background-color: rgba(0,0,0,0.1);
    grid-template-columns: 100%;
    grid-auto-rows: 50px;
    justify-items: center;
    align-items: center;
    padding: 40px;
    grid-gap: 20px;
    box-shadow: 0px 0px 39px 9px #00A54F;
    
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
        height : 40px;
        width : 60px;
        font-family : inherit;
    }

`

class Login extends Component {
  render() {
    return <Main>
        <img alt="" src={require('./res/logo.png')}/>
        <Box>
            <p>Email</p>
            <input placeholder="Email"/>

            <p>Password</p>
            <input placeholder="Password"/>

            <button class="button" type="button" onClick={ this.loginEvent }>
                <span>
                    LOGIN
                </span>
            </button>
        </Box>
    </Main>
  }
}

export default Login;
