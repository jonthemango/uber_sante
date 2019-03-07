import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Consult from './Consult'
import Calendar from './Calendar'
import SignUp from './SignUp'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}  />
          <Route exact path="/Login" component={Login}  />
          <Route exact path="/Consult" component={Consult}  />
          <Route exact path="/Calendar" component={Calendar}  />
          <Route exact path="/Signup" component={SignUp}  />
        </Switch>
      </Router>
    );
  }
}

export default App;
