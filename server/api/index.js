const router = require('express').Router();

const ticketmaster = require('./ticketmaster');
const spotify = require('./spotify');
const auth = require('./auth');
// TODO: will need for creating new users
const user = require('./user');
const genre = require('./genre');
const concert = require('./concerts');

router.use('/ticketmaster', ticketmaster);
router.use('/spotify', spotify);
router.use('/auth', auth);
router.use('/genre', genre);
router.use('/concerts', concert);

// TODO: will need for creating new users
router.use('/user', user);

module.exports = router;
