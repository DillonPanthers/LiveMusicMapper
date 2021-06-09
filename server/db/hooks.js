//Import models here from relationships.js
const {
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('./relationships');

User.findUser = async (id) => {
    return await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
            {
                model: User,
                as: 'friends',
                attributes: ['id', 'firstName', 'lastName', 'imageUrl'],
            },
            'concerts',
        ],
    });
};

User.attendConcert = async (id, concert) => {
    const user = await User.findByPk(id);
    let newConcert = await Concert.findByPk(concert.id);
    // console.log('----> user & concertId:', user, concert.id);
    if (!newConcert) {
        newConcert = await Concert.create(concert);
        // console.log('---->User.attendConcert, newConcert:', newConcert);
    }
    await user.addConcert(newConcert);
};

User.acceptFriend = async (friendId, userId) => {
    await Friendship.create({ userId, friendId, status: 'accepted' });

    const addedFriend = await Friendship.findByPk(friendId);
    await addedFriend.update({ status: 'accepted' });
};
//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
