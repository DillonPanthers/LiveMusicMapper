import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../../contexts/Store';
import { Typography, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import FriendRequests from './FriendRequests';

import axios from 'axios';
import Search from './Search';
//TODO: Make this component so only a logged in user can view it.
//TODO: Do we want to accept the friend request logic on this page?
//TODO: Do we want to add an unfriend option?
//TODO: Do we want to sort the requested vs the unrequested?

const AllFriends = () => {
    const { auth, getUserData } = useContext(GlobalState);
    const [user, setUser] = auth;

    useEffect(() => {
        const getData = async () => {
            await getUserData();
        };
        getData();
    }, []);
    return user.friends ? (
        <Container style={{ display: 'flex' }}>
            <Container>
                <Typography style={{ textDecoration: 'underline' }}>
                    Friends
                </Typography>
                {user.friends.length > 0 ? (
                    user.friends.map((friend) =>
                        friend.friendship.status === 'accepted' ? (
                            <li key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    {`${friend.firstName} ${friend.lastName}`}
                                </Link>
                            </li>
                        ) : (
                            <li key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    {`${friend.firstName} ${friend.lastName} (requested)`}
                                </Link>
                            </li>
                        )
                    )
                ) : (
                    <Typography>No Friends :(</Typography>
                )}
            </Container>
            <Container>
                <Typography style={{ textDecoration: 'underline' }}>
                    Pending Friend Requests
                </Typography>
                <FriendRequests />
            </Container>
            <Search />
        </Container>
    ) : null;
};

export default AllFriends;
