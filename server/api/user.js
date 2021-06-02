const router = require('express').Router();

const { Concert } = require('../db/index');
const { requireToken } = require('./utils/utils');

// GET /api/user/:id/concerts
router.get('/:id/concerts', requireToken, async (req, res, next) => {
    try {
        res.send(await Concert.byToken(req.user, req.params.id));
    } catch (ex) {
        next(ex);
    }
});

// GET /api/user/:id/friends

// GET /api/user/:id/friends/events

module.exports = router;
