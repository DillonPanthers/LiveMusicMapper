import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'; 

import { GlobalState } from '../contexts/Store';

const Dashboard = () => {
    const { auth, getUserData } = useContext(GlobalState);
    const [user, setUser] = auth;

    user.friends = user.friends || [];
    user.concerts = user.concerts || [];

    return (
        <>
            <p>See {user.id ? user.firstName : 'User'}'s events</p>
            <p>Friends:</p>
            <ul>
                {user.friends.map((friend) =>
                    friend.friendship.status === 'accepted' ? (
                        <li key={friend.id}><Link to = {`/user/${friend.id}`}>{friend.firstName}</Link></li>
                    ) : (
                        <div key={friend.id}></div>
                    )
                )}
            </ul>
            <p>Upcoming Concerts:</p>
            <ul>
                {user.concerts.map((concert) => (
                    <li key={concert.id}>{`${concert.name} (${concert.date})`}</li>
                ))}
            </ul>
        </>
    );
};

export default Dashboard;
