//Import models here from relationships.js
const {
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('./relationships');

User.findUser = function (id) {
    return User.findByPk(id, {
        attributes: { exlude: ['password'] },
        include: [
            {
                model: User,
                as: 'friends',
                attributes: ['id', 'firstName', 'lastName'],
            },
            'concerts',
        ],
    });
};

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
