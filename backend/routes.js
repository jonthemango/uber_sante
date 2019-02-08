// =========== Declare API Constants =========
app = require('./app')

// ============ Declare all Routers ===========
const users = require('express').Router();

// =========== Put all those routers in a list  ===========
const routes = {users}

// =========== USERS ================
const UserController = require("./controllers/UserController");
users.get(`/users/`, UserController.getUsers);


module.exports = routes


