const router = require('express').Router();

const { User } = require('../db/index');
const { requireToken } = require('./utils/utils');

// POST /api/auth
router.post('/', async (req, res, next) => {
    try {
        res.send({ token: await User.authenticate(req.body) });
    } catch (ex) {
        next(ex);
    }
});

// GET /api/auth
router.get('/', requireToken, async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
