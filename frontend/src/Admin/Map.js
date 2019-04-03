import React, { Component } from 'react';
import IframeComponent from './IframeComponent';

 
class SimpleMap extends Component {
  
 
  render() {
  
    const jsx = <iframe
    width="600"
    height="450"
    frameborder="0" style="border:0"
    src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY
      &q=Space+Needle,Seattle+WA" allowfullscreen>
  </iframe>

  const iframe = () => {
     
  }

  return (
      // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%', marginTop: "2em"}}>
        <IframeComponent src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBOmW-WP0dtM7sQbXZuBNwu3uUX-5rrZrw
    &q=Uber,Seattle+WA" height="600" width="100%"/>
      </div>
    );
  }
}

export default SimpleMap;