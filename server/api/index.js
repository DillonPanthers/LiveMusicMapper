
const router = require('express').Router();
const app = require('../server');
const ticketmaster = require('./ticketmaster')
router.use('/ticketmaster', ticketmaster)
module.exports = router;