//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { Genre } = require('./models/Genre');
const { User } = require('./models/User');

//Relationships Here
Concert.belongsToMany(Genre, { through: 'concertgenres', timestamps: false });
Genre.belongsToMany(Concert, { through: 'concertgenres', timestamps: false });

//After relationships are created, export them here into hooks.js
module.exports = { Concert, Genre, User };
