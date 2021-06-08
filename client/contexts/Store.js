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
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/auth', {
            headers: {
                authorization: token,
            },
        });
        const userData = response.data;
        console.log(userData);
        if (userData.id) {
            setUser(userData);
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
