//Import models here from relationships.js
const { Concert, Genre, User, Friendship } = require('./relationships');

User.findUser = (id) => {
    return User.findByPk(id, {
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

    const addedFriend = await Friendship.findOne({
        where: { userId: friendId, friendId: userId },
    });
    await addedFriend.update({ status: 'accepted' });
};

User.sendFriendRequest = async (userId, friendId) => {
    await Friendship.create({ userId, friendId });
};

User.rejectFriendRequest = async (userId, friendId) => {
    const friendship = await Friendship.findOne({
        where: { userId, friendId },
    });
    friendship.destroy();
};

User.deleteConcert = async (userId, concertId) => {
    const user = await User.findByPk(userId);
    await user.removeConcert(concertId);
};
//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship };
