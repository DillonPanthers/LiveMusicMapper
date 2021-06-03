import React, { createContext, useState } from 'react';
const initialState = {
    concerts: [],
    singleConcert: {},
    user: {},
    location: {},
};

export const GlobalState = createContext(null);
const Store = ({ children }) => {
    const [concerts, setConcerts] = useState([]);
    const [singleConcert, setSingleConcert] = useState({});
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({});

    return (
        <GlobalState.Provider
            value={{
                concerts: [concerts, setConcerts],
                currSingleConcert: [singleConcert, setSingleConcert],
                auth: [user, setUser],
                location: [location, setLocation],
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};
export default Store;
