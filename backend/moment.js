const moment = require('moment');
const date = "2019-03-03"
let isWithin = moment().add(4,'w').isAfter(moment(date));
let isTodayOrLater = moment(date).add(1,'d').isAfter(moment(), 'day');

console.log(isWithin);
console.log(isTodayOrLater);