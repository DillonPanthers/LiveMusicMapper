//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { Genre } = require('./models/Genre');

/*
Relationships Here
*/

//After relationships are created, export them here into hooks.js
module.exports = { Concert, Genre };
