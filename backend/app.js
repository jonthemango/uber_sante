// ============ Random Dependencies ==========
const express = require('express')

const AppSingleton = (function () {

    var instance;

    function createInstance(){
        return express();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();

const app = AppSingleton.getInstance();
const AppointmentsController = require('./controllers/AppointmentsController')
const log = require('fancy-log')
const argv = require('yargs').argv
const { p = 5001, port = p, withlog } = argv
const bodyParser = require('body-parser')
const logger = (message) => {
    withlog ? log('Uber Sante API - ' + message) : null
}
// ================ Configuration ========================
app.set('json spaces', 4)

// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, id")
    res.header("Content-Type", 'application/json')
    next()
})

// Constants for API
const route = '/api';

// Get the routes
routers = require('./routes');

// ============ Document routes ==================
const document_routers = require('./docs');
const package = document_routers(routers, route, port)

// ============ Add api routes to the api ==========
for (key in routers) {
    app.use(route, routers[key])
}

// Logger Middleware
app.all('*', (req, res, next) => {
    logger(`${req.method} - [${req.url}]`)
    next();
})

// Go to '/' to see a list of all methods
app.get(['/', '/api/'], (req, res) => {
    res.status(200)
    res.json({
        "message": 'healthy',
        "description": "A RESTful API for Uber Sante. This api self documents itself and all its routes here at / or /api/",
        "helpful_links": {
            "repo": "https://github.com/jonthemango/uber_sante",
            "mongobb_node_docs": "http://mongodb.github.io/node-mongodb-native/3.1/",
            "database_view": "http://68.183.207.82:8081/",
            "database_connection": "mongodb://root:example@68.183.207.82:27017/",
            "rest": "https://en.wikipedia.org/wiki/Representational_state_transfer",
            "noras_requirements": "https://moodle.concordia.ca/moodle/pluginfile.php/3479944/mod_label/intro/SOEN%20344_W2019.pdf",
            "google_drive_link": "https://drive.google.com/drive/folders/18JtRxc3k4mJlnwUYyOA46yeWAYsZnGBH?usp=sharing"
        },
        "commands": {
            "npm run dev": "Runs the backend server. Check '/backend/routes.js' to get started looking through the code.",
            "npm run test": "Runs the test suite. Check '/backend/tests/' to get started looking at how to write tests. Make sure backend is not running when running tests."
        },
        "co_author_info": {
            "ramez": "Co-authored-by: ramzouza <ramezzaid@outlook.com>",
            "jon": "Co-authored-by: jonthemango <jonathan.mongeau@mail.concordia.ca>",
            "yanis": "Co-authored-by: Sibachir Ahmed-Yanis <ahmed.yanis.sibachir@gmail.com>",
            "yann": "Co-authored-by: Yann Cedric <ngadeuyann@yahoo.fr>",
            "ribal": "Co-authored-by: Ribal Aladeeb <aladeeb.r@hotmail.com>",
            "eric": "Co-authored-by: Eric Kokmanian <erickokmanian1997@gmail.com>",
            "skander": "Co-authored-by: skanderbm123 <skander96@hotmail.com>",
            "all": "Co-authored-by: ramzouza <ramezzaid@outlook.com> Co-authored-by: jonthemango <jonathan.mongeau@mail.concordia.ca> Co-authored-by: Sibachir Ahmed-Yanis <ahmed.yanis.sibachir@gmail.com> Co-authored-by: Yann Cedric <ngadeuyann@yahoo.fr> Co-authored-by: Ribal Aladeeb <aladeeb.r@hotmail.com> Co-authored-by: Eric Kokmanian <erickokmanian1997@gmail.com> Co-authored-by: skanderbm123 <>"
        },
        "api_reference": package
    })

})




server = app.listen(port, () => {
    logger('backend started on port ' + port)
})

module.exports = server
