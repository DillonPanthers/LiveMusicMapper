const {
    db,
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('../server/db/index'); // import models from index so we have access to hooks and magic methods

const { users } = require('./data/users');
const { concerts } = require('./data/concerts');

const init = async () => {
    try {
        await db.sync({ force: true });
        const [vikki, alejandra, inderprit, craig] = await Promise.all(
            users.map((user) =>
                User.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                })
            )
        );
        await vikki.addFriend(alejandra);

        const [concert] = await Promise.all(
            concerts.map((concert) => {
                console.log('-----> seed:', concert);
                return Concert.create(concert);
            })
        );
        await vikki.addConcert(concert);
        console.log('connected');
        await db.close();
    } catch (error) {
        console.log(error);
    }
};

init();
