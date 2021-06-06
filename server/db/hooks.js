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
    if (!newConcert) {
        newConcert = await Concert.create(concert);
    }
    await user.addConcert(newConcert);
};

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
