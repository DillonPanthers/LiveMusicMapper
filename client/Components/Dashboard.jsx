import React, { useContext, useState, useEffect } from 'react';

import { GlobalState } from '../contexts/Store';

const Dashboard = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    user.friends = user.friends || [];
    user.concerts = user.concerts || [];

    return (
        <>
            <p>See {user.id ? user.firstName : 'User'}'s events</p>
            <p>Friends:</p>
            <ul>
                {user.friends.map((friend) => (
                    <li key={friend.id}>{friend.firstName}</li>
                ))}
            </ul>
            <p>Upcoming Concerts:</p>
            <ul>
                {user.concerts.map((concert) => (
                    <li key={concert.id}>{concert.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Dashboard;
