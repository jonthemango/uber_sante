import React, {Component} from 'react'
import styled from 'styled-components'

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
      background-color: 'grey';
      grid-template-areas: 
      "icon infos infos"
      "icon infos infos"
`

export default class DoctorHome extends Component {

    render(){
        return(
            <React.Fragment>

            <Navbar>
                <img alt="" src={require('./res/logo.png')}/>
                <Links>
                    <Link>
                        <a href="/">Settings</a> 
                        <Separator/>
                    </Link>
                </Links>
            </Navbar>
            <Main>

            </Main>

            </React.Fragment>
        )
    }
}