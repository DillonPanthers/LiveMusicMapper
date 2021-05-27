//Import models here from relationships.js
const {
  Concert,
  Genre,
  User,
  Friendship,
  FriendRequest,
} = require('./relationships');
/*

Hooks that require more than one model go here. We can divide them into regions
using //#region  if needed

*/

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
