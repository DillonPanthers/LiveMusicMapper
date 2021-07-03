const { db, Concert, Genre, User, Friendship } = require('../server/db/index'); // import models from index so we have access to hooks and magic methods

const { users } = require('./data/users');
const { concerts } = require('./data/concerts');
const { genres } = require('./data/genres');

const init = async () => {
    try {
        await db.sync({ force: true });
        const [
            vikki,
            alejandra,
            inderprit,
            max,
            mango,
            water,
            alcott,
            anna,
            anthony,
            arjan,
            christine,
            damien,
            danny,
            dominique,
            ellie,
            emily,
            prof,
            felicia,
            felicity,
            fred,
            hugo,
            itai,
            jonathan,
            justin,
            keri,
            kevinf,
            keving,
            linda,
            casper,
            manu,
            michelle,
            princess,
            russel,
            sam,
            stanley,
            stephan,
            thompson,
            yiru,
            zaina,
            eliot,
        ] = await Promise.all(users.map((user) => User.create(user)));

        const [concert] = await Promise.all(
            concerts.map((concert) => {
                return Concert.create(concert);
            })
        );

        await prof.addFriend(vikki);
        await keri.addFriend(vikki);
        await danny.addFriend(vikki);
        await stanley.addFriend(vikki);
        await thompson.addFriend(vikki);
        await zaina.addFriend(vikki);
        await eliot.addFriend(vikki);

        await mango.addFriend(alejandra);
        await max.addFriend(alejandra);
        await water.addFriend(alejandra);
        await alcott.addFriend(alejandra);
        await russel.addFriend(alejandra);
        await anna.addFriend(alejandra);
        await vikki.addFriend(alejandra);

        await max.addFriend(inderprit);
        await manu.addFriend(inderprit);
        await stanley.addFriend(inderprit);
        await arjan.addFriend(inderprit);
        await felicia.addFriend(inderprit);
        await prof.addFriend(inderprit);
        await zaina.addFriend(inderprit);
        await thompson.addFriend(inderprit);
        await sam.addFriend(inderprit);

        await Promise.all(genres.map((genre) => Genre.create(genre)));

        console.log('connected');
        await db.close();
    } catch (error) {
        console.log(error);
    }
};

init();
