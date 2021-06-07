const router = require('express').Router();

const { User, Friendship } = require('../db/index');
const { requireToken } = require('./utils/utils');

// TODO: add a route to create a user
// NOTE: this may not be required bc we are eagerloading concerts with the user model
// TODO: Do we need to secure these routes? Is it just adding requireToken function

// GET /api/user/id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findUser(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/user/id/friendrequests

router.get('/:id/friendrequests', async (req, res, next) => {
    try {
        const { id } = req.params;
        const requests = await Friendship.getRequestedBy(id);
        res.send(requests);
    } catch (error) {
        next(error);
    }
});

// GET /api/user/concert

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
