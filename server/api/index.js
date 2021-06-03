const router = require('express').Router();

const ticketmaster = require('./ticketmaster');
const spotify = require('./spotify');
const auth = require('./auth');
// const user = require('./user'); TODO: Not needed at the moment

router.use('/ticketmaster', ticketmaster);
router.use('/spotify', spotify);
router.use('/auth', auth);
// router.use('/user', user); TODO: Not needed at the moment

module.exports = router;
