import React, { useContext, useState, useEffect } from 'react';

import { GlobalState } from '../contexts/Store';

const Dashboard = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;

    return (
        <>
            <p>See {user.id ? user.firstName : 'User'}'s events</p>
        </>
    );
};

export default Dashboard;
