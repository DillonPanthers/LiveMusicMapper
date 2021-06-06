//Import models here from relationships.js
const {
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('./relationships');

const attributes = {
    attributes: { exclude: ['password'] },
    include: [
        {
            model: User,
            as: 'friends',
            attributes: ['id', 'firstName', 'lastName', 'imageUrl'],
        },
        'concerts',
    ],
};

// TODO: cleanup
User.findUser = async (id) => {
    console.log(3);
    // NOTE: On hard refresh call to read user fails here
    const person = await User.findByPk(id, attributes);
    console.log(person);
    return person;
};

User.findUserBySpotifyId = async (id) => {
    return await User.findOne({ where: { spotifyId: id } }, attributes);
};

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
