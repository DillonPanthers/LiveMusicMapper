//Create Genre Model Here
const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Genre = db.define(
  'genres',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

module.exports = { Genre };
