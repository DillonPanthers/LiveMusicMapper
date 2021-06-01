import React, { createContext, useState } from 'react';

const initialState = {
    concerts: [],
    singleConcert: {},
    user: {},
};

export const GlobalState = createContext(null);

const Store = ({ children }) => {
    const [concerts, setConcerts] = useState([]);
    const [singleConcert, setSingleConcert] = useState({});
    const [user, setUser] = useState({});

    return (
        <GlobalState.Provider
            value={{
                concerts: [concerts, setConcerts],
                currSingleConcert: [singleConcert, setSingleConcert],
                user: [user, setUser],
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};

export default Store;
