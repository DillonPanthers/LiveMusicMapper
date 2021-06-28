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
        allowNull: true,
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
        defaultValue: 'profile_pic_placeholder.png',
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
    ticketmasterGenres: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('ticketmasterGenres'));
        },
        set(value) {
            this.setDataValue('ticketmasterGenres', JSON.stringify(value));
        },
        defaultValue: '{}',
    },
    artists: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('artists'));
        },
        set(value) {
            this.setDataValue('artists', JSON.stringify(value));
        },
        defaultValue: '{}',
    },
    recommendedArtists: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('recommendedArtists'));
        },
        set(value) {
            this.setDataValue('recommendedArtists', JSON.stringify(value));
        },
        defaultValue: '{}',
    },
});

// encrypts password
User.beforeCreate(async (user) => {
    user.email = user.email.toLowerCase();
    if (user._changed.has('password')) {
        user.password = await bcrypt.hash(user.password, 5);
    }
});

// verifies user by their token
User.byToken = async (token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findUser(id);
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
    let error;
    if (user) {
        if (user.spotifyId) {
            error = new Error(
                "Looks like you've already connected your Spotify account. Please log in with your Spotify account instead."
            );
        } else if (await bcrypt.compare(password, user.password)) {
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        }
    } else {
        error = new Error(
            "The Username and Password don't match our records, please check them and try logging in again."
        );
    }
    error.status = 401;
    throw error;
};

// generates token for a Spotify OAuth login & adds signature on the backend
User.generateToken = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        return jwt.sign({ id }, process.env.JWT_SECRET);
    }
};

User.checkDuplicate = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        const error = new Error('This email address is already in use');
        error.status = 409;
        throw error;
    }
};

module.exports = { User };
