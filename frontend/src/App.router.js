import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Consult from './Consult'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}  />
          <Route exact path="/login" component={Login}  />
          <Route exact path="/Consult" component={Consult}  />
        </Switch>
      </Router>
    );
  }
}

export default App;
