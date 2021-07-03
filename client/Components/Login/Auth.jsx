import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

function Auth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [called, setCalled] = useState(false);

    useEffect(() => {
        const loginThroughSpotify = () => {
            const token = qs.parse(location.hash);

            window.localStorage.setItem(
                'spotify_token',
                token['#/auth/access_token']
            );
            window.localStorage.setItem('token', token.jwtToken);
        };

        loginThroughSpotify();
        if (window.localStorage.getItem('spotify_token') !== 'undefined') {
            setLoggedIn(true);
            setCalled(true);
        }
    }, []);
    return loggedIn && called ? <Redirect to="/map" /> : null;
}

export default Auth;
