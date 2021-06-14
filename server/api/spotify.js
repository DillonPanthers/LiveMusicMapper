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
    getRecommendedArtists,
} = require('./utils/spotify');

dotenv.config();

const redirect_uri =
    process.env.REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';
const SPOTIFY_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
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
                client_id: SPOTIFY_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
                code,
                grant_type,
                redirect_uri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const { access_token, refresh_token } = response.data;

        /* get exisitng Spotify user data or create a new one in the backend */
        const userData = await spotifyApiCall(
            'https://api.spotify.com/v1/me',
            access_token
        );
        // console.log(userData);

        let { email, id, display_name } = userData;
        email = email.toLowerCase();

        /* Find user with an email that matches one used in Spotify account */
        let user = await User.findOne({ where: { email } });

        /* These fields will be saved onto the user object, and will be initialized as empty objects in case spotify does not fetch any topArtists data for the user */
        let genres = [],
            artists = {},
            recommendedArtists = {},
            ticketmasterGenres = {};

        /* get Spotify user's top artists */
        const topArtists = await spotifyApiCall(
            'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0',
            access_token
        );
        let { items } = topArtists;
        console.log(items, 'items here');
        /* If 'items' contains data, store into genres and artists objects and use those variables to grab recommended artists and ticketmaster genres */
        if (items.length) {
            genres = items.reduce(
                (acc, artist) => [...acc, ...artist.genres],
                []
            );
            artists = items.reduce(
                (acc, artist) => ({ ...acc, [artist.name]: artist.id }),
                {}
            );

            /* get 20 max artist recommendations based on user's top Spotify artists. 2 is an argument for getting 'n' recommended artists for every top artist */
            recommendedArtists = await getRecommendedArtists(
                artists,
                access_token,
                2
            );

            /* Matches user's spotify genres with ticketmaster ones for Ticketmaster API calls */
            ticketmasterGenres = await getPersonalizedTMGenres(genres);
        }

        /* Conditions for an existing user with/without a spotify account*/
        if (user) {
            /* Gets user's latest genres & includes older ones if API call only fetches a few new ones */
            genres = consolidateArray(user.genres, genres, 20);

            /* Gets user's latest artists & includes older ones if the API call only fetches a few new ones */
            artists = consolidateObj(user.artists, artists, 10);

            /* We separately call it here for an exisiting user because we want to use the consolidated artists object */
            recommendedArtists = await getRecommendedArtists(
                artists,
                access_token,
                2
            );

            /* We separately call it here for an exisiting user because we want to use the consolidated genres array */
            ticketmasterGenres = await getPersonalizedTMGenres(genres);

            if (!user.spotifyId) user.spotifyId = id;
            user.genres = genres;
            user.artists = artists;
            user.recommendedArtists = recommendedArtists;
            user.ticketmasterGenres = ticketmasterGenres;
            await user.save();
        } else if (!user) {
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
