const faker = require('faker');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const randomImages = () => {
    const funcArr = [
        faker.image.animals,
        faker.image.city,
        faker.image.food,
        faker.image.nightlife,
        faker.image.transport,
        faker.image.nature,
        faker.image.fashion,
        faker.image.business,
        faker.image.sports,
        faker.image.avatar,
        faker.image.abstract,
        faker.image.people,
        faker.image.technics,
        faker.image.imageUrl,
        faker.image.cats,
    ];
    const randomIndex = getRandomIntInclusive(0, funcArr.length - 1);

    const image = funcArr[randomIndex];
    return image();
};

const users = [
    {
        firstName: 'Vikki',
        lastName: 'Chan',
        email: 'vikkiwchan@gmail.com',
        password: '1234',
        isAdmin: true,
        imageUrl:
            'https://lh3.googleusercontent.com/d/1xm-8yLhUDvRvsPexXPgTtXMTphyFJ4qc',
        genres: ['electronic', 'pop', 'soul', 'r&b', 'indie rock'],
        artists: {
            'Harry Styles': '6KImCVD70vtIoJWnq6nGn3',
            'Glass Animals': '4yvcSjfu4PC0CYQyLy4wSq',
            'Dua Lipa': '6M2wZ9GZgrQXHCFfjv46we',
            'Arlo Parks': '4kIwETcbpuFgRukE8o7Opx',
            Khruangbin: '2mVVjNmdjXZZDvhgQWiakk',
            'Leon Bridges': '3qnGvpP8Yth1AqSBMqON5x',
            'Sylvan Esso': '39vA9YljbnOApXKniLWBZv',
            'LCD Soundsystem': '066X20Nz7iquqkkCW6Jxy6',
            Robyn: '6UE7nl9mha6s8z0wFQFIZ2',
            'The xx': '3iOvXCl6edW5Um0fXEBRXy',
        },
    },
    {
        firstName: 'Alejandra',
        lastName: 'Villanueva',
        email: 'alenewvill@gmail.com',
        password: '1234',
        imageUrl:
            'https://lh3.googleusercontent.com/d/1CvxiHRxum6-7AJLwHK5YNjAxBem79syY',
        isAdmin: true,
        isPublic: false,
    },
    {
        firstName: 'Inderprit',
        lastName: 'Singh',
        email: 'narutoip@hotmail.com',
        imageUrl:
            'https://lh3.googleusercontent.com/d/1GO2-NmrBG9g_uKvi9JMR2La7diS8wkyf',
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Max',
        lastName: 'Dog',
        email: 'maxdog@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Mango',
        lastName: 'Cat',
        email: 'mangocat@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Water',
        lastName: 'Bottle',
        email: 'waterbottle@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Alcott',
        lastName: 'Vernon',
        email: 'alcott@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Anna',
        lastName: 'Litoskaya',
        email: 'anna@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Anthony',
        lastName: 'Sgro',
        email: 'anthony@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Arjan',
        lastName: 'Mitra',
        email: 'Arjan@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Christine',
        lastName: 'Su',
        email: 'christine@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Damien',
        lastName: 'Outar',
        email: 'damien@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Danny',
        lastName: 'Lahamar',
        email: 'danny@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Dominique',
        lastName: 'Sobieski',
        email: 'dominque@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Ellie',
        lastName: 'King',
        email: 'ellie@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Emily',
        lastName: 'Asaro',
        email: 'emily@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Prof',
        lastName: 'Katz',
        email: 'prof@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Felicia',
        lastName: 'Heiney',
        email: 'felicia@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Felicity',
        lastName: 'Wu',
        email: 'felicity@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Fred',
        lastName: 'Zhang',
        email: 'fred@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Hugo',
        lastName: 'Sanchez',
        email: 'hugo@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Itai',
        lastName: 'Rozen',
        email: 'itai@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Jonathan',
        lastName: 'Unknown',
        email: 'jonathan@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Justin',
        lastName: 'Mattos',
        email: 'justin@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Keri',
        lastName: 'Weiss',
        email: 'keri@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Kevin',
        lastName: 'Flessa',
        email: 'kevinf@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Kevin',
        lastName: 'Gil',
        email: 'keving@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Linda',
        lastName: 'Nzeukang',
        email: 'linda@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Maciej',
        lastName: 'Piech',
        email: 'casper@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Manu',
        lastName: 'Swami',
        email: 'manu@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Michelle',
        lastName: 'Martin',
        email: 'michelle@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Princess',
        lastName: 'Onyiri',
        email: 'princess@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Russel',
        lastName: 'McMillan',
        email: 'russel@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Sam',
        lastName: 'Fedenia',
        email: 'sam@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Stanley',
        lastName: 'Lim',
        email: 'stanley@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Stephan',
        lastName: 'Alas',
        email: 'stephan@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Thompson',
        lastName: 'Harris',
        email: 'thompson@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Yiru',
        lastName: 'Ding',
        email: 'yiru@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Zaina',
        lastName: 'Rodney',
        email: 'zaina@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Eliot',
        lastName: 'Szwajkowski',
        email: 'eliot@gmail.com',
        imageUrl: randomImages(),
        password: '1234',
        isAdmin: true,
        isPublic: false,
    },
];

module.exports = { users };
