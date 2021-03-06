const router = require('express').Router();

const { User } = require('../db/index');
const { requireToken } = require('./utils/utils');

// POST /api/auth - returns token for email account
router.post('/', async (req, res, next) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        res.send({ token: await User.authenticate({ email, password }) });
    } catch (err) {
        next(err);
    }
});

// GET /api/auth
router.get('/', requireToken, async (req, res, next) => {
    try {
        const { user } = req;
        const {
            id,
            firstName,
            lastName,
            email,
            fullName,
            imageUrl,
            isAdmin,
            isPublic,
            friends,
            concerts,
            spotifyId,
            ticketmasterGenres,
            artists,
            recommendedArtists,
        } = user;
        res.send({
            id,
            firstName,
            lastName,
            email,
            fullName,
            imageUrl,
            isAdmin,
            isPublic,
            friends,
            concerts,
            spotifyId,
            ticketmasterGenres,
            artists,
            recommendedArtists,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
