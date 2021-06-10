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

const consolidateObj = (existingObj, newObj, n) => {
    // 'n' represents the limit of artists that is returned
    // ensures we only have unique values
    // console.log(1);
    console.log(existingObj, newObj);
    const set = new Set();
    let result = {};

    // logic for adding artists from previous state if the number of new artists is less than 'n'
    if (Object.keys(newObj).length < n) {
        // console.log(2);
        for (let [artist, id] of Object.entries(newObj)) {
            set.add(artist);
            result = { ...result, [artist]: id };
            console.log(result);
        }

        const numOfAllowedPrevArtists = n - set.size;
        let count = 0;

        for (let [artist, id] of Object.entries(existingObj)) {
            if (!set.has(artist)) {
                count += 1;
                result = { ...result, [artist]: id };
                // console.log(count);
                // console.log(artist, id);
                if (count === numOfAllowedPrevArtists) break;
            }
        }
        return result;
    } else return newObj;
};

module.exports = { requireToken, consolidateArray, consolidateObj };
