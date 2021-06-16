const router = require('express').Router();

const { User, Friendship } = require('../db/index');
const { requireToken } = require('./utils/utils');

// TODO: add a route to create a user

router.get('/search', requireToken, async (req, res, next) => {
    try {
        //I want to just send back users that have a public profile, if that's the case maybe we won't need a requiretoken to access that user data?
        //we could again always send back some simple user data like the id and name and basic stuff for those that have the isPublic set to true.
        const { name } = req.query;
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'email', 'isAdmin', 'spotifyId'],
            },
        });
        const filteredUsers = users.filter(
            (user) =>
                user.dataValues.firstName.toLowerCase() === name.toLowerCase()
        );
        res.send(filteredUsers);
    } catch (err) {
        next(err);
    }
});

// GET /api/user/id/friendrequests
router.get('/friendrequests', requireToken, async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = user;
        const requests = await Friendship.getRequestedBy(id);
        res.send(requests);
    } catch (error) {
        next(error);
    }
});

// GET /api/user/id
/*order really matters in the way you set up your routes because it hits the first one it matches. when you have /:id first, it interprets anything that comes after the / as an id. so in that case it thinks search is an id. but when you have first search first, it recognizes search as its own route, and anything that isn’t search it interprets as an id.*/

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

// POST /api/user/add-friend - add friend
router.post('/add-friend', async (req, res, next) => {
    try {
        const { userId, friendId } = req.body;
        await User.sendFriendRequest(userId, friendId);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});
// POST /api/user/accept-friend - add friend
router.post('/accept-friend', async (req, res, next) => {
    try {
        const { requesterId, inviteeId } = req.body;

        await User.acceptFriend(requesterId, inviteeId);

        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

router.delete('/reject-friend', async (req, res, next) => {
    try {
        const { requesterId, inviteeId } = req.body;
        await User.rejectFriendRequest(requesterId, inviteeId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.delete('/concert', async (req, res, next) => {
    try {
        const { userId, concertId } = req.body;
        await User.deleteConcert(userId, concertId);
        res.sendStatus(200);
    } catch (ex) {
        next(ex);
    }
});
module.exports = router;
