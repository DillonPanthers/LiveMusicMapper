import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';

function ArtistTracks({ artistName }) {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    const [artistId, setArtistId] = useState('');

    useEffect(() => {
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
            console.log('ID', id);
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
        <h2>No Artist Tracks Found</h2>
    );
}

export default ArtistTracks;
