const router = require('express').Router();

const ticketmaster = require('./ticketmaster');
const spotify = require('./spotify');
const auth = require('./auth');
const user = require('./user');

router.use('/ticketmaster', ticketmaster);
router.use('/spotify', spotify);
router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
