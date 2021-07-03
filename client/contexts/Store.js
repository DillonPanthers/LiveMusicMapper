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
    const [newNotification, setNewNotification] = useState(false);
    const [mapView, setMapView] = useState('');
    const [personalized, setPersonalized] = useState(false);
    const [googleInfo, setGoogleInfo] = useState({
        GOOGLE_MAP_KEY: '',
        GOOGLE_MAP_ID: [],
    });

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

    const grabGoogleInfo = async () => {
        const {
            data: { GOOGLE_MAP_KEY, GOOGLE_MAP_ID },
        } = await axios.get('/api/googlemaps');

        setGoogleInfo({ GOOGLE_MAP_KEY, GOOGLE_MAP_ID: [GOOGLE_MAP_ID] });
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
                newNotification: [newNotification, setNewNotification],
                mapViews: [mapView, setMapView],
                personalization: [personalized, setPersonalized],
                googleInformation: [googleInfo, setGoogleInfo],
                grabGoogleInfo,
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};
export default Store;
