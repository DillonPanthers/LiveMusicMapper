const { User } = require('../../db/index');

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // finds user based on header token
        const user = await User.byToken(token);
        // if user exists, add user to request
        req.user = user;
        // allows request to move onto the next function
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    requireToken,
};
