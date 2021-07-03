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

const checkValidFields = (firstName, lastName, email, password) => {
    const error = new Error('All fields are required');
    error.status = 400;
    if (
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === ''
    ) {
        throw error;
    }
};

const validEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        const error = new Error('Not a valid email address');
        error.status = 400;
        throw error;
    }
};

module.exports = {
    requireToken,
    checkValidFields,
    validEmail,
};
