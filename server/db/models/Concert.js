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

    venueAddress: {
      type: DataTypes.STRING,
      allowNull: true,
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

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },

    eventUrl: {
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

module.exports = { Concert };

//#region How to access info from ticketmaster response
/*
https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#event-details-v2
//ID (attractions.id)
//Artist Name (attractions.name)
//Venue Name (venues.name)
//Venue Address (venues.address.line1)
//Venue City (venues.city.name)
//Venue State (venues.state.stateCode)
//Venue Zip Code (venues.country.countryCode)
//Venue Country (venues.country.countryCode)
//Venue Lat (venues.country.latitude)
//Venue Lon (venues.country.longitude)
//Genres (classifications.id, classifications.name)
//date (dates.localDate)
//time (dates.localTime)
//image (images[0].url)
//url (url)
*/
//#endregion
