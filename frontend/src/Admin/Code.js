import React, { Component } from 'react';
import {GET, POST, PUT, DELETE} from '../ApiCall'
import {Button, FormGroup, Input, Label}  from 'reactstrap';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

class Code extends Component {

  async fetchCode(){
    let result; 

    if (this.state.method == "POST"){
        result = await POST(this.state.route, this.state.body)
        .then(res => res.json())
        .catch(e => {
            return e
        })
    } else if (this.state.method == "GET"){
        result = await GET(this.state.route)
        .then(res => res.json())
        .catch(e => {
            return e
        })
    } else if (this.state.method == "PUT"){
        result = await PUT(this.state.route, this.state.body)
        .then(res => res.json())
        .catch(e => {
            return e
        })
    } else if (this.state.method == "DELETE"){
        result = await DELETE(this.state.route)
        .then(res => res.json())
        .catch(e => {
            return e
        })
    } else {
        result = await GET('/api/')
        .then(res=> res.json())
        .catch(e => {
            return e
        })
    }
    
    console.log(result);
    this.setState({code: result})
    return result

  }

  constructor(props){
      super(props);
      this.state = {
          code:"",
          method: "",
          body: ""
      }
  }

  componentDidMount(){
      this.setState({code:"", route:"/api/", method:"GET", body:""})
      this.fetchCode();
  }

 
  render() {

  return (
    <div>
        <FormGroup>
          <Label>Route</Label>
          <Input type="text" name="route" placeholder={this.state.route} value={this.state.route} onChange={ e => this.setState({route: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label>Method</Label>
          <Input type="select" name="select"  onChange={e => this.setState({method: e.target.value})}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </Input>
          </FormGroup>
          <FormGroup>
          { this.state.method == "POST" || this.state.method =="PUT" ? <React.Fragment>
              <Label>Body</Label>
          <Input type="textarea" name="text" value={this.state.body} onChange={e => this.setState({body: e.target.value})}/>
          </React.Fragment> : null }
          <Button onClick={() => this.fetchCode()}>Request</Button>
        </FormGroup>
        <JSONPretty id="json-pretty" data={this.state.code}></JSONPretty>
    </div>
    );
  }
}

export default Code;