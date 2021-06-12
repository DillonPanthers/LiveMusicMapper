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
const {genres}= require('./data/genres')

const init = async () => {
    try {
        await db.sync({ force: true });
        const [vikki, alejandra, inderprit, craig] = await Promise.all(
            users.map((user) => User.create(user))
        );

        const [concert] = await Promise.all(
            concerts.map((concert) => {
                return Concert.create(concert);
            })
        );

        await vikki.addConcert(concert);
        await vikki.addFriend(alejandra);

      await Promise.all(
        genres.map((genre) => 
        Genre.create(genre))
    );


        console.log('connected');
        await db.close();
    } catch (error) {
        console.log(error);
    }
};

init();
