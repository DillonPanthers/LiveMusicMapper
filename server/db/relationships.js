//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { Genre } = require('./models/Genre');
const { User } = require('./models/User');
const { Friendship } = require('./models/Friendship');
const { FriendRequest } = require('./models/FriendRequest');

// Concert Genres
Concert.belongsToMany(Genre, { through: 'concertgenres', timestamps: false });
Genre.belongsToMany(Concert, { through: 'concertgenres', timestamps: false });

// User Concerts
Concert.belongsToMany(User, {
    as: 'attendees',
    through: 'userconcerts',
    timestamps: false,
});
User.belongsToMany(Concert, {
    as: 'concerts',
    through: 'userconcerts',
    timestamps: false,
});

// User.findAll({ include: 'friends'}), -> show User's friends
// Note: you can't do include: Friendship
User.belongsToMany(User, {
    as: 'friends',
    through: Friendship,
    foreignKey: 'userId',
    otherKey: 'friendId',
});

// Friendship.findAll({ include: [{model: User, as: userInfo or friendInfo}]})
// Use Friendship table to get user friendships
Friendship.belongsTo(User, { as: 'userInfo', foreignKey: 'userId' });
Friendship.belongsTo(User, { as: 'friendInfo', foreignKey: 'friendId' });

/*
// Friend Request System

// User.findAll({ include: 'invitees' })) -> find people User has invited/requested
// instance.getInvitees() -> get an instances invitees / person they have requested
User.belongsToMany(User, {
    as: 'invitees',
    through: FriendRequest,
    foreignKey: 'requesterId',
    otherKey: 'inviteeId',
});

// User.findAll({ include: 'requestedBy' })) -> find people who have requested you
// instance.getRequestedBy()
User.belongsToMany(User, {
    as: 'requestedBy',
    through: FriendRequest,
    foreignKey: 'inviteeId',
    otherKey: 'requesterId',
});

// FriendRequest.findAll({ include: [{model: User, as: "invitee" or "requestedBy"}]})
// Use FriendRequest table to find info on invitee and requester
FriendRequest.belongsTo(User, { as: 'invitee', foreignKey: 'inviteeId' });
FriendRequest.belongsTo(User, { as: 'requestedBy', foreignKey: 'requesterId' });
*/

// After relationships are created, export them here into hooks.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
