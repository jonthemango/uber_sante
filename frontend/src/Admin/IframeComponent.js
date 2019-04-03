import React from 'react';
export default class IframeComponent extends React.Component {
  render() {
    return (
      <div>
        <iframe src={this.props.src} height={this.props.height} width={this.props.width}  className="fullheight"/>
      </div>
    )
  }
}