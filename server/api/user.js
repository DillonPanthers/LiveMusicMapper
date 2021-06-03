const router = require('express').Router();

const { Concert } = require('../db/index');
const { requireToken } = require('./utils/utils');

// TODO: Probably don't need this since concerts and friends will be eager loaded with user in auth route

// GET /api/user/:id/concerts
router.get('/:id/concerts', requireToken, async (req, res, next) => {
    try {
        res.send(await Concert.byToken(req.user, req.params.id));
    } catch (ex) {
        next(ex);
    }
});

// POST /api/user/ - create user

module.exports = router;
