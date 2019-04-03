import React, { Component } from 'react';
import {GET, POST, PUT, DELETE} from '../ApiCall'
import {Button, FormGroup, Input, Label, Alert}  from 'reactstrap';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

class Code extends Component {

  async fetchCode(){
    let result; 

    if (this.state.method == "POST"){
        result = await POST(this.state.route, JSON.parse(this.state.body))
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
        result = await PUT(this.state.route, JSON.parse(this.state.body))
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
        this.getDocs()
    }
    
    console.log(result);
    this.setState({code: result})
    return result

  }

  async getDocs(){
    const result = await GET('/api/')
        .then(res=> res.json())
        .catch(e => {
            return e
        })
        this.setState({code: result})
  }

  constructor(props){
      super(props);
      this.state = {
          code:"",
          method: "",
          body: "",
          refs: []
      }
  }

  async componentDidMount(){
      this.setState({code:"", route:"/api/", method:"GET", body:{}})
      await this.fetchCode();
      await this.getDocs();
  }

  getBody(type){
    let obj = {}
    switch(type) {
        case "Doctor":
          obj = {
            "email": "doctor@doctor.com",
            "password": "doctor2",
            "clinicId": "5ca3b5d1aa9b21270113dd04",
            "availability": {},
            "city": "M",
            "firstname": "George",
            "lastname": "Mane",
            "permit": "77",
            "specialty": "General Doctor"
          }
          break;
        case "Patient":
          obj = {
            "healthCardNB": "123",
            "firstname": "Jonathan",
            "lastname": "Mongeau",
            "birthDay": "1979-07-12",
            "sex": "M",
            "phoneNumber": "4388702403",
            "physicalAddress": "123 Namur",
            "email": "patient@patient.com",
            "password": "",
            "cart": null
          }
          break;
        case "Nurse":
          obj = {
            "email": "nurse@nurse.com",
            "firstname": "yanis",
            "lastname": "the nurse",
            "accessId": "1123209",
            "password": "nurse",
            "clinicId": "5ca3b5d1aa9b21270113dd04"
        }
          break;
        case "Clinic":
          obj = {
            "rooms": 5,
            "name": "Clinic Name"
          }
          break;
        case "Appointment":
          obj = {
            clinicId: "5ca3b5d1aa9b21270113dd04",
            patientId: "5c9bdf8c96f76beced682397",
            date: "2019-03-28",
            blockIds: [9,10,11],
            paymentInfo: {cardNumber: 1}
          }
          break;
        default:
          // code block
      }
      this.setState({body: JSON.stringify(obj, null, 4)})
  }

 
  render() {

  return (
    <div>
        <FormGroup>
          <Label>Route</Label>
          <Input type="text" name="route" placeholder={this.state.route} value={this.state.route} onChange={ e => this.setState({route: e.target.value})}/>
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
              <FormGroup>
              <Label>Body</Label>
              <Input type="select" name="select"  onChange={e =>  this.getBody(e.target.value)}>
            <option>-</option>
            <option>Patient</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Clinic</option>
            <option>Appointment</option>
          </Input>
          <Input type="textarea" style={{height: "20em"}} name="text" value={this.state.body} onChange={e => this.setState({body: e.target.value})}/>
              </FormGroup>
          </React.Fragment> : null }
          <Alert color="danger">
          Interaction with API through this console is experimental
          </Alert>
          <Button color="primary" style={{marginRight: "1em"}} onClick={() => this.fetchCode()}>Make Request</Button>
          <Button color="success" style={{marginRight: "1em"}} onClick={() => this.getDocs()}>View Docs</Button>
        </FormGroup>
        <h2>API Response</h2>
        <JSONPretty id="json-pretty" data={this.state.code}></JSONPretty>
    </div>
    );
  }
}

export default Code;