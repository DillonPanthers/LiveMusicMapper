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
});

// encrypts password
User.beforeCreate(async (user) => {
    if (user._changed.has('password')) {
        user.password = await bcrypt.hash(user.password, 5);
    }
});

// verifies user by their token
User.byToken = async (token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        // TODO: separate logic
        // TODO: attributes to exclude - email, password, isAdmin
        const user = await User.findUser(id);
        if (user) {
            return user;
        }
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
