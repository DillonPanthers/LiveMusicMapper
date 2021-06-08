import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

function SingleUser(props) {
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkIfFriend = async () => {
        //i dont want to set user since user is already set in useEffect hook
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/auth', {
            headers: {
                authorization: token,
            },
        });
        //this is logged in users data, we are checking to see if the current pages friend id matches out user data id friend array, then we display
        const userData = response.data;

        if (userData.id === user.id) {
            setIsProfile(true);
        }

        let isFriend = false;
        // console.log(userData.friends, 'user data here');
        //console.log(userData.friends)
        userData.friends.forEach((friend) => {
            if (friend.id === user.id) {
                isFriend = true;
            }
        });

        if (window.localStorage.token) {
            setIsLoggedIn(true);
        }

        setIsFriend(isFriend);
    };

    useEffect(() => {
        const getUser = async () => {
            const { id } = props.match.params;
            const user = await axios.get(`/api/user/${id}`);
            setUser(user.data);
            console.log(user.data);
        };

        getUser();
    }, [props.match.params]);

    checkIfFriend();
    // console.log(window.localStorage.token === undefined, 'token is');

    //TODO: Update page view for if a user searches themselves up, and are logged in, to redirect them to a dashboard
    //TODO: Logic for if a user is searching someone up without logging

    //the reason why the else part of the ternary works without checking to see if a user exists is because on initial load, the user is
    //going to be an {} empty object, and then afterwards it gets populated, and technically user.fullName of an empty object would be undefined.
    //If the user is logged in and searches their own profile up, it will redirect them to their own dashboard page

    return (
        <Container>
            {isLoggedIn ? (
                <Container>
                    <Typography>{user.fullName}</Typography>
                    {isFriend ? (
                        `${user.fullName} is friends with you!`
                    ) : isProfile ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Button variant="contained">Add Friend</Button>
                    )}
                </Container>
            ) : (
                user.fullName
            )}
        </Container>
    );
}

export default SingleUser;
