const qs = require('qs');
const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

const { User } = require('../db/index');

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
        if (!items.length) {
            genres = [];
            artists = [];
        } else {
            genres = items.reduce((acc, artist) => {
                return [...acc, ...artist.genres];
            }, []);
            artists = items.reduce((acc, artist) => {
                return [...acc, artist.name];
            }, []);
        }

        // Logic for connecting existing user with an email that matches email in Spotify user account
        let user = await User.findOne({ where: { email } });

        // Checks if user has not connected with Spotify and adds music preferences
        if (user && !user.spotifyId) {
            user.spotifyId = id;

            // updates existing genres with latest genres listed first in array. existing genres array could look like ['pop'], but as spotify profile matures, place new genres in front of the array and pop of the older genres if the array length exceeds N length.
            user.genres = [...genres, ...user.genres];
            const consolidatedGenreArray = user.genres;
            if (consolidatedGenreArray.length > 10) {
                while (consolidatedGenreArray.length > 10) {
                    consolidatedGenreArray.pop();
                }
            }
            user.genres = consolidatedGenreArray;

            // logic will be similar to consolidating the genres array
            user.artists = [...artists, ...user.artists];
            const consolidatedArtistsArray = user.artists;
            if (consolidatedArtistsArray.length > 10) {
                while (consolidatedArtistsArray.length > 10) {
                    consolidatedArtistsArray.pop();
                }
            }
            user.artists = consolidatedArtistsArray;

            await user.save();
            // Checks if user has been connected through Spotify already, if so, update latest genres and artists
        } else if (user) {
            user.genres = genres;
            user.artists = artists;
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
