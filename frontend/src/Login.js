import React, { Component } from 'react';
import cookie from 'react-cookies'

class Login extends Component {
    constructor(){
        super()
           this.state = {
              userID: '',
              password:'',
              }
        
      }



      loginEvent(e){
        const {userID, password} = this.state


      }


    
  render() {

    return (
      
        <React.Fragment>
        
        <div>
                  
          
          <input id="" onChange={evt => {this.setState({userID: evt.target.value})}}  type="text"  placeholder="ID" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
          
          <input id="password" onChange={evt => {this.setState({password: evt.target.value})}}  type="password"  placeholder="Password" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
          
          <button type="button"><span>
              LOGIN
          </span></button>
          
         
        </div>
        </React.Fragment>
      );


  }
}


export default Login;