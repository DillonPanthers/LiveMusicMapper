const { db, Concert, Genre, User, Friendship } = require('../server/db/index'); // import models from index so we have access to hooks and magic methods

const { users } = require('./data/users');
const { concerts } = require('./data/concerts');
const { genres } = require('./data/genres');

const init = async () => {
    try {
        await db.sync({ force: true });
        const [vikki, alejandra, craig, inderprit, max, mango, water] =
            await Promise.all(users.map((user) => User.create(user)));

        const [concert] = await Promise.all(
            concerts.map((concert) => {
                return Concert.create(concert);
            })
        );

        await vikki.addFriend(alejandra);
        await craig.addFriend(alejandra);
        await inderprit.addFriend(alejandra);
        await mango.addFriend(alejandra);
        await max.addFriend(alejandra);
        await water.addFriend(alejandra);
        await max.addFriend(inderprit);

        await Promise.all(genres.map((genre) => Genre.create(genre)));

        console.log('connected');
        await db.close();
    } catch (error) {
        console.log(error);
    }
};

init();
