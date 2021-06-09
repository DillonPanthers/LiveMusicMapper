const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Friendship = db.define('friendship', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },

    friendId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },

    status: {
        type: DataTypes.ENUM(['pending', 'blocked', 'accepted']),
        allowNull: false,
        defaultValue: 'pending',
    },
});

Friendship.getRequestedBy = (id) => {
    return Friendship.findAll({
        where: { friendId: id, status: 'pending' },
        include: ['userInfo'],
    });
};
module.exports = { Friendship };
