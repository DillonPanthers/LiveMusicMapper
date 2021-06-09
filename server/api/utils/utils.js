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

const consolidateArray = (existingArray, newArray, n) => {
    // handles duplicate elements
    newArray = newArray.reduce((acc, elem) => {
        if (!existingArray.includes(elem)) acc.push(elem);
        return acc;
    }, []);
    const consolidatedArray = [...newArray, ...existingArray];
    if (consolidatedArray.length > n) {
        while (consolidatedArray.length > n) {
            consolidatedArray.pop();
        }
    }
    return consolidatedArray;
};

module.exports = { requireToken, consolidateArray };
