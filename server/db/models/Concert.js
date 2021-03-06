//Create Concert Model Here
const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Concert = db.define(
    'concert',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        date: {
            //might need to change type depending on ticketmaster data
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        time: {
            //will also see if this works with ticketmaster data
            type: DataTypes.TIME,
            allowNull: true,
        },

        venueName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        lon: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        timestamps: false,
    }
);

Concert.findAttendees = async function (id) {
    const concert = await Concert.findByPk(id);
    let attendees = [];
    if (concert) {
        attendees = concert.getAttendees({
            attributes: ['id', 'firstName', 'lastName', 'imageUrl'],
        });
    }
    return attendees;
};
module.exports = { Concert };

//#region How to access info from ticketmaster response
/*
https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#event-details-v2
//ID (attractions.id)
//Event Name (attractions.name)
//Venue Name (_embedded.venues[0].name)
//Venue Lat (venues.country.latitude)
//Venue Lon (venues.country.longitude)
//Genres (classifications.id, classifications.name)
//date (dates.start.localDate)
//time (dates.start.localTime)
//url (url)
*/
//#endregion
