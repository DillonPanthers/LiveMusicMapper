const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../db');
const { DataTypes } = require('sequelize');
require('dotenv').config();

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // password is not required for OAuth login
        // TODO: do we need to validate based on the spotify id?
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return `${this.firstName} ${this.lastName}`;
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
            'https://as2.ftcdn.net/v2/jpg/02/60/03/61/1000_F_260036118_AUYppgsODQeTCnbu0OXGNDXB8EVzpxKq.jpg',
    },

    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    spotifyId: {
        type: DataTypes.STRING,
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
    },
});

// encrypts password
User.beforeCreate(async (user) => {
    if (user._changed.has('password')) {
        user.password = await bcrypt.hash(user.password, 5);
    }
});

// verifies user by their token
User.byToken = async (token, isSpotifyUser) => {
    try {
        // console.log(1);
        // console.log('----> User.byToken', token);
        // console.log('----> isSpotifyUser', isSpotifyUser);
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        let user;
        // console.log(2);
        // console.log('----> id', id);
        // console.log(typeof isSpotifyUser);
        if (isSpotifyUser === 'true' || isSpotifyUser === true) {
            // console.log(3, 'a', 'true');
            // console.log('----> IF, isSpotifyUser', typeof isSpotifyUser);
            // console.log(isSpotifyUser === undefined);
            user = await User.findUserBySpotifyId(id);
        }
        // NOTE: code fails here and skips to line 92
        else if (isSpotifyUser === 'false' || isSpotifyUser === undefined) {
            //console.log(3, 'a');
            //console.log(id);
            user = await User.findUser(id);
        }
        if (user) {
            //console.log(4);
            return user;
        }
        // console.log(5);
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    } catch (ex) {
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    }
};

// generates token for user & adds signature on the backend
User.authenticate = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
};

// generates token for a SpotifyUser & adds signature on the backend
User.generateTokenForSpotifyAuth = async (id) => {
    const user = await User.findOne({
        where: {
            spotifyId: id,
        },
    });
    if (user) {
        return jwt.sign({ id }, process.env.JWT_SECRET);
    }
};

module.exports = { User };
