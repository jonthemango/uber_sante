import React, { Component } from 'react';
import IframeComponent from './IframeComponent';

 
class SimpleMap extends Component {
  
 
  render() {

  return (
      // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%', marginTop: "2em"}}>
        <IframeComponent src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDlfTsaZ7xrPyg40IrB2uJwABY4KReocgY
    &q=Uber,Seattle+WA" height="600" width="100%"/>
      </div>
    );
  }
}

export default SimpleMap;