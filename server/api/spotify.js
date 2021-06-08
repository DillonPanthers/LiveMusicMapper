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
        const { email, id, display_name } = userData;

        // sanitize display name to separate first and last
        const [firstName, lastName] = display_name.split(' ');

        // get Spotify user's top artists
        const topArtists = await axios.get(
            'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        const { items } = topArtists.data;
        const { genres } = items[0];
        // TODO: add genre from frontend so the call is always up to date with a post route?
        console.log('called from spotify.js', genres);

        // find Spotify user in the backend
        let user = await User.findOne({
            where: { spotifyId: id },
        });

        // TODO: figure out how to post on the backend
        user.genres = genres;

        // if Spotify user doesn't exist in the backend, create one
        if (!user) {
            user = await User.create({
                spotifyId: id,
                email,
                firstName,
                lastName,
                genres,
            });
        }

        const jwtToken = await User.generateTokenForSpotifyAuth(id);

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
