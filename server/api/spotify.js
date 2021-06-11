const qs = require('qs');
const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

const { User } = require('../db/index');
const {
    consolidateArray,
    consolidateObj,
    spotifyApiCall,
    getPersonalizedTMGenres,
} = require('./utils/spotify');

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

        /* get Spotify user data to find or create one in the backend */
        const userData = await spotifyApiCall(
            'https://api.spotify.com/v1/me',
            access_token
        );
        let { email, id, display_name } = userData;
        email = email.toLowerCase();

        /* get Spotify user's top artists */
        const topArtists = await spotifyApiCall(
            'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0',
            access_token
        );
        let { items } = topArtists;

        let genres;
        let artists;
        let recommendedArtists;
        let ticketmasterGenres;

        /* Store spotify data into distinct genres and artists array */
        if (!items.length) {
            genres = [];
            artists = {};
            recommendedArtists = {};
            ticketmasterGenres = {};
        } else {
            genres = items.reduce((acc, artist) => {
                return [...acc, ...artist.genres];
            }, []);
            artists = items.reduce((acc, artist) => {
                return { ...acc, [artist.name]: artist.id };
            }, {});
        }

        /* Find user with an email that matches the email in Spotify account */
        let user = await User.findOne({ where: { email } });

        /* Gets user's latest genres, includes older ones if the API only fetches a few new ones*/
        let consolidatedGenres = consolidateArray(user.genres, genres, 20);

        /* Matches user's spotify genres with ticketmaster ones for Ticketmaster API calls*/
        ticketmasterGenres = await getPersonalizedTMGenres(consolidatedGenres);

        /* get 20 artist recommendations based on user's top Spotify artists */
        let recommendedArtistsArray = [];
        if (Object.keys(artists).length) {
            await Promise.all(
                Object.entries(artists).map(async ([artist, id]) => {
                    const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
                    const { artists } = await spotifyApiCall(url, access_token);
                    let [artist1, artist2] = artists.slice(0, 2);
                    recommendedArtistsArray.push(
                        [artist1.name, artist1.id],
                        [artist2.name, artist2.id]
                    );
                })
            );
        }
        recommendedArtists = recommendedArtistsArray.reduce(
            (acc, [name, id]) => {
                acc[name] = id;
                return acc;
            },
            {}
        );

        if (user) {
            if (!user.spotifyId) user.spotifyId = id;
            user.genres = consolidatedGenres;

            /* See comments on how this function work in ./utils/spotify.js file */
            user.artists = consolidateObj(user.artists, artists, 10);
            user.recommendedArtists = recommendedArtists;
            user.ticketmasterGenres = ticketmasterGenres;
            await user.save();
        } else if (!user) {
            /*
            If user does not exist create spotify user in database. Sanitize display name to separate first and last.
            */
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
                ticketmasterGenres,
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
