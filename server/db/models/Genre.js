const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Genre = db.define(
    'genres',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
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
