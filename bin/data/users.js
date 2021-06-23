// TODO: Seed more users
const users = [
    {
        firstName: 'Vikki',
        lastName: 'Chan',
        email: 'vikkiwchan@gmail.com',
        password: '1234',
        isAdmin: true,
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
    },
    {
        firstName: 'Craig',
        lastName: 'Ferreira',
        email: 'ferreira.craig@gmail.com',
        password: '1234',
        isAdmin: true,
        isPublic: false,
    },
    {
        firstName: 'Inderprit',
        lastName: 'Singh',
        email: 'singhinderprit1992@gmail.com',
        imageUrl:
            'https://lh3.googleusercontent.com/d/1GO2-NmrBG9g_uKvi9JMR2La7diS8wkyf',
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Max',
        lastName: 'Dog',
        email: 'maxdog@gmail.com',
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Mango',
        lastName: 'Cat',
        email: 'mangocat@gmail.com',
        password: '1234',
        isAdmin: true,
    },
    {
        firstName: 'Water',
        lastName: 'Bottle',
        email: 'waterbottle@gmail.com',
        password: '1234',
        isAdmin: true,
    },
];

module.exports = { users };
