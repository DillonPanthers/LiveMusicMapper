const users = [
    {
        firstName: 'Vikki',
        lastName: 'Chan',
        email: 'vikkiwchan@gmail.com',
        password: '1234',
        isAdmin: true,
        genres: ['electronic', 'pop', 'soul', 'r&b', 'indie rock'],
        artists: [
            'Dua Lipa',
            'Arlo Parks',
            'Romy',
            'Khruangbin',
            'Leon Bridges',
            'Sylvan Esso',
            'Harry Styles',
        ],
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
