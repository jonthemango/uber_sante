import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Consult from './Consult'
import Calendar from './Calendar'
import SignUp from './SignUp'
import {NotificationContainer} from 'react-notifications';
import DoctorHome from './DoctorHome'
import Cart from './Cart'
import Admin from './admin/Admin'
import PatientHome from './PatientHome';
import NurseHome from './NurseHome';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/consult" component={Consult}/>
          <Route exact path="/calendar" component={Calendar}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/doctor" component={DoctorHome}/>
          <Route exact path="/patient" component={PatientHome}/>
          <Route exact path="/nurse" component={NurseHome}/>
          <Route exact path="/cart" component={Cart}/>
          <Route exact path="/admin" component={Admin}/>
        </Switch>
      </Router>
      <NotificationContainer style={{fontFamily: 'arial'}}/>
      </React.Fragment>
    );
  }
}

export default App;
