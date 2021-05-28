import cookie from 'react-cookies'
// const API = 'http://localhost:5001'          // when you run on your machine
const API = 'http://104.196.55.64:5001' //when you run on the server

export function POST(route, data, more_headers){
    console.log(API+route);
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json', 'id': id,...more_headers }, method: 'POST', body: JSON.stringify(data)})
}

export function Login(route, data, more_headers){
    console.log(API+route);
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json', 'id': id,...more_headers }, method: 'POST', body: JSON.stringify(data)})
}

export function GET(route, more_headers){
    console.log(API+route);
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'GET'})
}

export function PUT(route, data, more_headers){
    console.log(API+route);
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'PUT', body: JSON.stringify(data)})
}

export function DELETE(route, data, more_headers){
    const id = cookie.load('id');
    return fetch(API+route, {headers: { 'Content-Type': 'application/json','id': id, ...more_headers }, method: 'DELETE', body: JSON.stringify(data)})
}
