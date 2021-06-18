const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// GET /api/ticketmaster/concert/:id
// Route for Single Concert
const TM_API = process.env.TICKETMASTERAPIKEY;

router.get('/concert/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data } = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${TM_API}`
        );
        res.send(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/ticketmaster/genres
router.get('/genres', async (req, res, next) => {
    try {
        const { latlong, radius, genreId } = req.query;
        const { data } = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=200&latlong=${latlong}&radius=${radius}&${genreId}apikey=${TM_API}`
        );
        res.send(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
