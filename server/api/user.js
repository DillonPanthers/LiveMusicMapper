const router = require('express').Router();

const { Concert } = require('../db/index');
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

// POST /api/user/ - create user

module.exports = router;
