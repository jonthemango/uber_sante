
const route = "users" // same name as file and enpoint
const api = require('express').Router();

api.get(`/${route}/`, function(req, res){
    res.json({ message: 'get users' })
});

api.post(`/${route}/`, function(req, res){
    res.json({message : 'post users'})
});

api.package_name = route;
module.exports = api;
