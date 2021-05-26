//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { User } = require('./models/User');
const { Friend } = require('./models/Friend');

/*
Relationships Here
*/
User.hasMany(Friend, { through: 'Users_Friends' });
Friend.belongsToMany(User, { through: 'Users_Friends' });

//After relationships are created, export them here into hooks.js
module.exports = { Concert, User, Friend };
