import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GlobalState = createContext(null);
const Store = ({ children }) => {
    const [concerts, setConcerts] = useState({});
    const [venues, setVenues] = useState({});
    const [singleConcert, setSingleConcert] = useState({});
    const [singleVenue, setSingleVenue] = useState({});
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({ lat: 0, lon: 0 });
    const [genre, setGenre] = useState('');
    const [radius, setRadius] = useState(40);

    const getUserData = async () => {
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/auth', {
            headers: {
                authorization: token,
            },
        });
        const userData = response.data;
        if (userData.id) {
            setUser(userData);
        }
    };

    const getUserLocation = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
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
                genres: [genre, setGenre],
                theRadius: [radius, setRadius],
                getUserData,
                getUserLocation,
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};
export default Store;
