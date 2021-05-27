const { db } = require('../db');
const { DataTypes } = require('sequelize');

const FriendRequest = db.define('friendRequest', {
  inviterId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  inviteeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  status: {
    type: DataTypes.ENUM(['pending', 'rejected', 'accepted']),
  },
});

module.exports = { FriendRequest };
