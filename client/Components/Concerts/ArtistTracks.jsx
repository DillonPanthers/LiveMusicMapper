import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Typography, makeStyles } from '@material-ui/core';

import { GlobalState } from '../../contexts/Store';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: '1.5rem',
        alignSelf: 'flex-start',
    },
}));

function ArtistTracks({ artistName }) {
    const classes = useStyles();
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    const [artistId, setArtistId] = useState('');

    useEffect(() => {
        // TODO: Add try catch statement to prevent crashing. You can use a default value at {artists = []} but it will only work if you get undefined. if you get null the call will crash.
        const grabArtistId = async () => {
            const access_token = window.localStorage.getItem('spotify_token');

            const {
                data: { artists },
            } = await axios.get(
                `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            const id = artists.items.length ? artists.items[0].id : '';
            setArtistId(id);
        };
        if (user.spotifyId && artistName.length) {
            grabArtistId();
        }
    }, [artistName, user.spotifyId]);

    return artistId.length ? (
        <iframe
            src={`https://open.spotify.com/embed/artist/${artistId}`}
            width="320"
            height="400"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
        ></iframe>
    ) : (
        <Typography className={classes.text} variant="h6">
            No Artist Tracks Found
        </Typography>
    );
}

export default ArtistTracks;
