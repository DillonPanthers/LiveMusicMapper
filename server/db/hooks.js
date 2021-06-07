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
    // console.log(3, 'b');
    // console.log('----> id', id);
    const user = await User.findByPk(id, attributes);
    // console.log('----> user', user);
    return user;
};

User.findUserBySpotifyId = async (spotifyId) => {
    //console.log(3, 'b');
    let user = await User.findOne({ where: { spotifyId } });
    const { id } = user;
    user = await User.findByPk(id, attributes);
    return user;
};

User.attendConcert = async (id, concert) => {
    const user = await User.findByPk(id);
    let newConcert = await Concert.findByPk(concert.id);
    console.log('----> user & concertId:', user, concert.id);
    // NOTE: newConcert is null here
    console.log('---->User.attendConcert, newConcert:', newConcert);
    if (!newConcert) {
        newConcert = await Concert.create(concert);
    }
    await user.addConcert(newConcert);
};

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
