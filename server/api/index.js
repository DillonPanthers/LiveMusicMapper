const router = require('express').Router();
const app = require('../server');
const ticketmaster = require('./ticketmaster');
const spotify = require('./spotify');

router.use('/ticketmaster', ticketmaster);
router.use('/spotify', spotify);

module.exports = router;
