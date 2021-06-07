import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GlobalState = createContext(null);
const Store = ({ children }) => {
    const [concerts, setConcerts] = useState({});
    const [venues, setVenues] = useState({});
    const [singleConcert, setSingleConcert] = useState({});
    const [singleVenue, setSingleVenue] = useState({});
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({});

    const getUserData = async () => {
        const jwtToken = window.localStorage.getItem('token');
        const spotifyToken = window.localStorage.getItem('spotify_token');

        if (jwtToken) {
            let response;
            if (spotifyToken) {
                response = await axios.get('/api/auth', {
                    headers: {
                        authorization: jwtToken,
                        spotify: true,
                    },
                });
            } else {
                response = await axios.get('/api/auth', {
                    headers: {
                        authorization: jwtToken,
                        spotify: false,
                    },
                });
            }
            const userData = response.data;
            console.log('----> userData', userData);
            if (userData.id) {
                setUser(userData);
            }
        }
    };

    return (
        <GlobalState.Provider
            value={{
                concerts: [concerts, setConcerts],
                currSingleConcert: [singleConcert, setSingleConcert],
                currSingleVenue: [singleVenue, setSingleVenue],
                auth: [user, setUser],
                location: [location, setLocation],
                venues: [venues, setVenues],
                getUserData,
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};
export default Store;
