const { Genre } = require('../../db/index');
const axios = require('axios');
const { closest, distance } = require('fastest-levenshtein');

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

const getRecommendedArtists = async (topArtists, access_token, n) => {
    let recArtistsArray = [];
    await Promise.all(
        Object.entries(topArtists).map(async ([artist, id]) => {
            const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
            const { artists } = await spotifyApiCall(url, access_token);
            // Handles artists that already exist in the Top Artists object
            // only allow 2 artists from recommended artists
            let count = 0;
            for (let recArtist of artists) {
                if (!topArtists[recArtist.name]) {
                    ++count;
                    recArtistsArray.push([recArtist.name, recArtist.id]);
                }
                if (count === n) break;
            }
        })
    );
    return recArtistsArray.reduce((acc, [name, id]) => {
        acc[name] = id;
        return acc;
    }, {});
};

const getPersonalizedTMGenres = async (spotifyGenres) => {
    let tmGenres = await Genre.findAll();
    /* convert to an array of strings to use as an argument for matching function 'closest*/
    let tmArray = tmGenres.map((genre) => genre.dataValues.name);

    /* convert to an object to easily access ID values */
    tmGenres = tmGenres.reduce((acc, genre) => {
        acc[genre.dataValues.name] = genre.dataValues.id;
        return acc;
    }, {});

    return spotifyGenres.reduce((acc, genre) => {
        const closestGenre = closest(genre, tmArray);
        const matchRating = distance(genre, closestGenre);
        const id = tmGenres[closestGenre];
        return !(closestGenre in acc) && matchRating < 10
            ? { ...acc, [closestGenre]: id }
            : acc;
    }, {});
};

module.exports = {
    consolidateArray,
    consolidateObj,
    spotifyApiCall,
    getPersonalizedTMGenres,
    getRecommendedArtists,
};
