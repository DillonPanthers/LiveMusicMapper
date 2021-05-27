const { db } = require('./db');

//import models from hooks.js
const { Concert, Genre, User, Friendship, FriendRequest } = require('./hooks');

///export models and db into the seed file
module.exports = { db, Concert, Genre, User, Friendship, FriendRequest };
