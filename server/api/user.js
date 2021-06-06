const router = require('express').Router();

const { User } = require('../db/index');
const { requireToken } = require('./utils/utils');

// TODO: add a route to create a user

// NOTE: this may not be required bc we are eagerloading concerts with the user model

// GET /api/user/:id/concerts
// router.get('/:id/concerts', requireToken, async (req, res, next) => {
//     try {
//         res.send(await Concert.byToken(req.user, req.params.id));
//     } catch (ex) {
//         next(ex);
//     }
// });

router.post('/concert', async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { id, name, dates, _embedded, url } = req.body.concert;
        const { localDate, localTime } = dates.start;
        const venueName = _embedded.venues[0].name;
        const { location } = _embedded.venues[0];
        const { latitude, longitude } = location;
        const concert = {
            id,
            name,
            url,
            venueName,
            date: localDate,
            time: localTime,
            lat: latitude,
            lon: longitude,
        };
        await User.attendConcert(userId, concert);
        res.sendStatus(200);
    } catch (ex) {
        next(ex);
    }
});

// POST /api/user/ - create user

module.exports = router;
