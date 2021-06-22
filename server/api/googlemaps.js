const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;
const GOOGLE_MAP_ID = process.env.GOOGLE_MAP_ID;

router.get('/', (req, res, next) => {
    try {
        res.send({ GOOGLE_MAP_KEY, GOOGLE_MAP_ID });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
