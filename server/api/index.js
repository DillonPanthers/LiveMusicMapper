const router = require('express').Router();

const ticketmaster = require('./ticketmaster');
const spotify = require('./spotify');
const auth = require('./auth');
const user = require('./user');
const genre = require('./genre');
const concert = require('./concerts');
const googlemaps = require('./googlemaps');

router.use('/ticketmaster', ticketmaster);
router.use('/spotify', spotify);
router.use('/auth', auth);
router.use('/genre', genre);
router.use('/concerts', concert);
router.use('/googlemaps', googlemaps);
router.use('/user', user);

module.exports = router;
