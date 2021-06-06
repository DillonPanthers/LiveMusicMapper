import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { GlobalState } from '../contexts/Store';

const Dashboard = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    user.friends = user.friends || [];
    user.concerts = user.concerts || [];

    // TODO; decide to keep or delete
    /*
    useEffect(() => {
        const jwtToken = window.localStorage.getItem('token');
        const spotifyToken = window.localStorage.getItem('spotify_token');
        const getUserData = async () => {
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
                if (userData.id) {
                    setUser(userData);
                }
            }
        };
        getUserData();
    }, [user]);
    */

    console.log(user);

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
