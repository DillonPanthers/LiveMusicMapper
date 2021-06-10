const { User } = require('../../db/index');
const axios = require('axios');

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

/*
Updates existing genres with latest genres listed first in array. as spotify profile matures, place new genres in front of the array and pop off the older genres if the array length exceeds N.
    EX: existingArray = ['electronic', 'pop', 'soul', 'r&b', 'indie rock']
    EX: newArray = ['new wave', 'folk', 'blues', 'country', 'classical','latin', 'electronic', 'pop', 'soul', 'r&b' ]
NOTE: may need to increase N value for genres because mutiple genres may be attached to a single artist from spotify data
*/
const consolidateArray = (existingArray, newArray, n) => {
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
    const set = new Set();
    let result = {};

    if (Object.keys(newObj).length < n) {
        for (let [artist, id] of Object.entries(newObj)) {
            set.add(artist);
            result = { ...result, [artist]: id };
        }

        const numOfAllowedPrevArtists = n - set.size;
        let count = 0;

        for (let [artist, id] of Object.entries(existingObj)) {
            if (!set.has(artist)) {
                count += 1;
                result = { ...result, [artist]: id };
                if (count === numOfAllowedPrevArtists) break;
            }
        }
        return result;
    } else return newObj;
};

const spotifyApiCall = async (url, access_token) => {
    const { data } = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};

module.exports = {
    requireToken,
    consolidateArray,
    consolidateObj,
    spotifyApiCall,
};
