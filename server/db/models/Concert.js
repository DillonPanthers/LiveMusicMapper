//Create Concert Model Here
const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Concert = db.define('concert', {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = { Concert };
