//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { Genre } = require('./models/Genre');
const { User } = require('./models/User');
const { Friendship } = require('./models/Friendship');
const { FriendRequest } = require('./models/FriendRequest');

Concert.belongsToMany(Genre, { through: 'concertgenres', timestamps: false });
Genre.belongsToMany(Concert, { through: 'concertgenres', timestamps: false });

// User.findAll({ include: 'friends'}), you can't do include: Friendship
User.belongsToMany(User, {
  as: 'friends',
  through: Friendship,
  foreignKey: 'userId',
  otherKey: 'friendId',
});

// Friendship.findAll({ include: [{model: User, as: userInfo or friendInfo}]})
Friendship.belongsTo(User, { as: 'userInfo', foreignKey: 'userId' });
Friendship.belongsTo(User, { as: 'friendInfo', foreignKey: 'friendId' });

// Friend Request System

User.hasMany(FriendRequest, { as: 'inviter', foreignKey: 'inviterId' });
User.hasMany(FriendRequest, { as: 'invitee', foreignKey: 'inviteeId' });

FriendRequest.belongsTo(User, { as: 'inviter', foreignKey: 'inviterId' });
FriendRequest.belongsTo(User, { as: 'invitee', foreignKey: 'inviteeId' });

//After relationships are created, export them here into hooks.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
