//Import all models from models folder here
const { Concert } = require('./models/Concert');
const { Genre } = require('./models/Genre');
const { User } = require('./models/User');
const { Friendship } = require('./models/Friendship');

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

// After relationships are created, export them here into hooks.js
module.exports = { Concert, Genre, User, Friendship };
