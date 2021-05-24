const { db } = require('./db');
const { Concert } = require('./hooks');

//import models from hooks.js

///export models and db into the seed file
module.exports = { db, Concert };
