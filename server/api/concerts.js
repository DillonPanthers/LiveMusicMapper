const router = require('express').Router();

const { Concert } = require('../db/');

// GET /concerts/attendees
router.get('/:id/attendees', async (req, res, next) => {
    try {
        const { id } = req.params;
        const attendees = await Concert.findAttendees(id);
        res.send(attendees);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
