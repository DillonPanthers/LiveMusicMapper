const qs = require('qs');
const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

const { User } = require('../db/index');
const { consolidateArray, consolidateObj } = require('./utils/utils');

dotenv.config();

const redirect_uri =
    process.env.REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

const SPOTIFY_ID = process.env.SPOTIFY_CLIENT_ID;
const SCOPES = process.env.SCOPES;

// GET /api/spotify/login
router.get('/login', (req, res, next) => {
    try {
        res.redirect(
            'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                SPOTIFY_ID +
                (SCOPES ? '&scope=' + encodeURIComponent(SCOPES) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirect_uri)
        );
    } catch (error) {
        next(error);
    }
});

// GET /api/spotify/callback
router.get('/callback', async (req, res, next) => {
    try {
        const code = req.query.code;
        const grant_type = 'authorization_code';

        let response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                code,
                grant_type,
                redirect_uri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;

        // get Spotify user data to find or create one in the backend
        response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userData = response.data;
        let { email, id, display_name } = userData;
        email = email.toLowerCase();

        // get Spotify user's top artists
        const topArtists = await axios.get(
            'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        let { items } = topArtists.data;
        let genres;
        let artists;
        let recommendedArtists;

        // consolidate spotify data into distinct genres and artists array
        if (!items.length) {
            genres = [];
            artists = {};
            recommendedArtists = {};
        } else {
            genres = items.reduce((acc, artist) => {
                return [...acc, ...artist.genres];
            }, []);
            artists = items.reduce((acc, artist) => {
                return { ...acc, [artist.name]: artist.id };
            }, {});
        }

        // Logic for connecting existing user with an email that matches email in Spotify user account
        let user = await User.findOne({ where: { email } });

        // RESUME HERE:
        // Get related artists - this will be helpful for finding additional events in the area if preferred artists are not playing locally
        const relatedArtistsAPI = async (id) => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/artists/${id}/related-artists`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            return data.artists;
        };

        // if (artists !== {}) {
        //     recommendedArtists = Object.entries(artists).reduce(
        //         async (acc, [artist, id]) => {
        //             console.log(112);
        //             let relatedArtistData = await relatedArtistsAPI(id);
        //             console.log('relatedArtistData', relatedArtistData);
        //             console.log(115);
        //             acc = relatedArtistData.splice(0, 2).forEach((elem) => {
        //                 acc = { ...acc, [elem.name]: elem.id };
        //             });
        //             return acc;
        //         },
        //         {}
        //     );
        // }
        // console.log(124);
        // console.log(recommendedArtists.length, recommendedArtists);

        if (artists !== {}) {
            await Promise.all(
                Object.entries(artists).reduce(async (acc, [artist, id]) => {
                    console.log(artist, id);
                    const { data } = await axios.get(
                        `https://api.spotify.com/v1/artists/${id}/related-artists`,
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    );
                    console.log(131, data);
                    return acc;
                }, {})
            );
        }

        // Checks if user has not connected with Spotify and adds music preferences
        if (user) {
            if (!user.spotifyId) user.spotifyId = id;

            // updates existing genres with latest genres listed first in array. as spotify profile matures, place new genres in front of the array and pop off the older genres if the array length exceeds N.
            // EX: existingArray = ['electronic', 'pop', 'soul', 'r&b', 'indie rock']
            // EX: newArray = ['new wave', 'folk', 'blues', 'country', 'classical','latin', 'electronic', 'pop', 'soul', 'r&b' ]
            // NOTE: may need to increase N value for genres because mutiple genres may be attached to a single artist from spotify data
            user.genres = consolidateArray(user.genres, genres, 20);

            // logic will be similar to consolidating the genres array
            user.artists = consolidateObj(user.artists, artists, 10);
            await user.save();
        } else if (!user) {
            // Checks if user does not exist and if so, create spotify user
            // sanitize display name to separate first and last
            let [firstName, lastName] = display_name.split(' ');
            if (!lastName) lastName = '';
            user = await User.create({
                spotifyId: id,
                email,
                firstName,
                lastName,
                genres,
                artists,
                recommendedArtists,
            });
        }

        const jwtToken = await User.generateToken(user.id);

        res.redirect(
            `http://localhost:3000/#/auth/${qs.stringify({
                access_token,
                refresh_token,
                jwtToken,
            })}`
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
