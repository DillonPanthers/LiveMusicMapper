const users = [
    {
        firstName: 'Vikki',
        lastName: 'Chan',
        email: 'vikkiwchan@gmail.com',
        password: '1234',
        isAdmin: true,
        genres: ['electronic', 'pop', 'soul', 'r&b', 'indie rock'],
        artists: {
            'Dua Lipa': '6M2wZ9GZgrQXHCFfjv46we',
            'Arlo Parks': '4kIwETcbpuFgRukE8o7Opx',
            Romy: '3X2DdnmoANw8Rg8luHyZQb',
            Khruangbin: '2mVVjNmdjXZZDvhgQWiakk',
            'Leon Bridges': '3qnGvpP8Yth1AqSBMqON5x',
            'Sylvan Esso': '39vA9YljbnOApXKniLWBZv',
            'Harry Styles': '6KImCVD70vtIoJWnq6nGn3',
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
        password: '1234',
        isAdmin: true,
    },
];

module.exports = { users };
