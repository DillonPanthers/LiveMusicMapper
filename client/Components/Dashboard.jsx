import React, { useContext, useState, useEffect } from 'react';

import { GlobalState } from '../contexts/Store';

const Dashboard = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    console.log('dashboard:', user);
    user.friends = user.friends || [];
    return (
        <>
            <p>See {user.id ? user.firstName : 'User'}'s events</p>
            <ul>
                {user.friends.map((friend) => (
                    <li key={friend.id}>{friend.fullName}</li>
                ))}
            </ul>
        </>
    );
};

export default Dashboard;
