import React, { createContext, useState } from 'react';
const initialState = {
    concerts: [],
    singleConcert: {},
    user: {},
    location: {},
};

export const GlobalState = createContext(null);
const Store = ({ children }) => {
    const [concerts, setConcerts] = useState({});
    const [venues, setVenues] = useState({});
    const [singleConcert, setSingleConcert] = useState({});
    const [singleVenue, setSingleVenue] = useState({});
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({});

    return (
        <GlobalState.Provider
            value={{
                concerts: [concerts, setConcerts],
                currSingleConcert: [singleConcert, setSingleConcert],
                currSingleVenue: [singleVenue, setSingleVenue],
                auth: [user, setUser],
                location: [location, setLocation],
                venues: [venues, setVenues],
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};
export default Store;
