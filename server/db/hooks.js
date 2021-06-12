//Import models here from relationships.js
const {
    Concert,
    Genre,
    User,
    Friendship,
    FriendRequest,
} = require('./relationships');

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

    const addedFriend = await Friendship.findByPk(friendId);
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


const genres= [
    {name:'Blues', id: "KnvZfZ7vAvd"},
{name:'Classical',id:  "KnvZfZ7vAeJ"},
{name:'Country', id:  "KnvZfZ7vAv6"},
{name:'DanceAndElectronic', id:  "KnvZfZ7vAvF"},
{name:'FairsAndFestivals',id:  "KnvZfZ7vAeE"},
{name:'Family',id:  "KnvZfZ7vA1n"},
{name:'HipHopAndRap',id:  "KnvZfZ7vAv1"},
{name:'Holiday',id:  "KnvZfZ7vAAt"},
{name:'Latin',id:  "KnvZfZ7vAJ6"},
{name:'MagicAndIllusion',id:  "KnvZfZ7v7lv"},
{name:'Metal',id:  "KnvZfZ7vAvt"},
{name: 'Miscellaneous', id:  "KnvZfZ7vA7A"},
{name:'Music',id:  "KnvZfZ7vAkJ"},
{name:'Other',id:  "KnvZfZ7vAvl"},
{name:'Pop',id:  "KnvZfZ7vAev"},
{name:'RAndB',id:  "KnvZfZ7vAee"},
{name:'Rock',id:  "KnvZfZ7vAeA"},
{name: 'Spectacular',id:  "KnvZfZ7v7la"},
{name:'World',id:  "KnvZfZ7vAeF"}
]

const syncAndSeed=async()=>{
    try{
       await Genre.sync({force: true})


    const [Blues, Classical, Country, DanceAndElectronic, FairsAndFestivals, Family,HipHopAndRap, Holiday, Latin, MagicAndIllusion,
        Metal, Miscellaneous, Music, Other, Pop, RAndB, Rock, Spectacular, World
    ] = await Promise.all(
        genres.map(({ name, id}) => 
        Genre.create({ name, id }))
    );

    await Promise.all([
        Blues.save(), 
        Classical.save(),

      ]) 

    }catch(err){
        console.log(err)
    }
}

syncAndSeed()

//Export models here and into index.js
module.exports = { Concert, Genre, User, Friendship, FriendRequest };
