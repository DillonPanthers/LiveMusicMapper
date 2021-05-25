//Create Concert Model Here
const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Concert = db.define('concert', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
  },
});

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
