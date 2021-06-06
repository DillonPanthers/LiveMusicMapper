//Import models here from relationships.js
const {
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('./relationships');

// NOTE: added 'isSpotifyUser' as a variable to grab a User based on their spotifyId
User.findUser = function (id, isSpotifyUser) {
    const attributes = {
        attributes: { exlude: ['password'] },
        include: [
            {
                model: User,
                as: 'friends',
                attributes: ['id', 'firstName', 'lastName', 'imageUrl'],
            },
            'concerts',
        ],
    };
    if (isSpotifyUser) {
        return User.findOne({ where: { spotifyId: id } }, attributes);
    }
    return User.findByPk(id, attributes);
};

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
