const { db } = require('../db');
const { DataTypes } = require('sequelize');

// friendId will be the same as a user's id
const Friend = db.define('friend', {
  friendId: {
    type: DataTypes.STRING,
  },
});

module.exports = { Friend };
