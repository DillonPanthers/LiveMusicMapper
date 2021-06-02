const { User } = require('../../db/index');

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // checks if there is a header
        const user = await User.byToken(token); // finds user on header
        req.user = user; // if user exists, add user to request
        next(); // allows request to move onto the next function
    } catch (error) {
        next(error);
    }
};

module.exports = { requireToken };
