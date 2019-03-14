const log = require('fancy-log')
const argv = require('yargs').argv
const { withlog } = argv

const logger = (message) => {
    withlog ? log('Uber Sante API - ' + message) : null
}

module.exports = logger