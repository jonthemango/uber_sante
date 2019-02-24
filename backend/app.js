// ============ Random Dependencies ==========
const express = require('express')
const app = express()
const log = require('fancy-log')
const argv = require('yargs').argv
const { p = 3003, port = p, withlog } = argv
const logger = (message) => {
    withlog ? log('Uber Sante API - ' + message) : null
}
// ================ Configuration ========================
app.set('json spaces', 4)

// ============ Allow Requests from a Browser ==========
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, id");
    res.header("Content-Type",'application/json');
    next()
})

// Constants for API 
const route = '/api';

// Get the routes
routers = require('./routes');

// ============ Document routes ==================
const document_routers = require('./docs');
const package = document_routers(routers, route)

// ============ Add api routes to the api ==========
for (key in routers){
    app.use(route, routers[key]);
}

// Go to '/' to see a list of all methods
app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'healthy', "api_reference": package })
    logger('GET - [/] ')
})


app.post('/', (req, res) => {
    console.log(req);
    res.json({ message: 'healthy', "api_reference": package, "body":req.body })
    logger('GET - [/] ')
})

server = app.listen(port, () => {
    logger('backend started on port ' + port)
})

module.exports = server;
