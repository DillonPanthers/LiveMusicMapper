const router = require('express').Router();

const { User, Friendship } = require('../db/index');
const { requireToken } = require('./utils/utils');

// TODO: add a route to create a user
// NOTE: this may not be required bc we are eagerloading concerts with the user model
// TODO: Do we need to secure these routes? Is it just adding requireToken function

//I set this path up to see grab the users in the database to display them in the search part of our frontend, if anyone see's any issues with this
//please let me know and i will get rid of it. Is this not secure? Should more data be excluded for the res.send of this route? Maybe we just need the user id and
//user's name so that we could attach a link to their name.

//for now i will put a requiretoken here, because of this a non logged in user will not be able to search for users that have accounts

//NOTE: Just to double check, the order of the paths below is fine right? as long as they are before the :id field, there shouldn't be any issues I presume

router.get('/search', requireToken, async (req, res, next) => {
    try {
        //I want to just send back users that have a public profile, if that's the case maybe we won't need a requiretoken to access that user data?
        //we could again always send back some simple user data like the id and name and basic stuff for those that have the isPublic set to true.
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'email', 'isAdmin', 'spotifyId'],
            },
        });
        res.send(users);
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
module.exports = router;
