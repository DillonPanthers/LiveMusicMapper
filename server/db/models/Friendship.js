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
});

module.exports = { Friendship };
