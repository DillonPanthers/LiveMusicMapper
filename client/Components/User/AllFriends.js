import React, { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../../contexts/Store';
import { Typography, Container, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import FriendRequests from './FriendRequests';
import Search from './Search';
//TODO: Do we want to add an unfriend option? Yes (cruD app)
//TODO: Do we want to sort the requested vs the unrequested? Yes

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    right: {
        display: 'flex',
        flex: '2',
        flexDirection: 'column',
        margin: '.75rem',
        height: '87vh',
    },
    left: {
        backgroundColor: '#382B71',
        flex: '2',
        margin: '.75rem',
        height: '87vh',
    },
    search: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        marginBottom: '.75rem',
        backgroundColor: '#382B71',
    },
    pending: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        backgroundColor: '#382B71',
        padding: '.5rem',
    },
    text: {
        textDecoration: 'underline',
    },
    friendReqs: {
        display: 'flex',
        flexDirection: 'row',
        flex: '2',
    },
}));

const AllFriends = () => {
    const { auth, getUserData } = useContext(GlobalState);
    const [user, setUser] = auth;

    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            await getUserData();
        };
        getData();
    }, []);

    return user.friends ? (
        <div className={classes.root}>
            <div className={classes.left}>
                <Typography className={classes.text}>Friends</Typography>
                {user.friends.length > 0 ? (
                    user.friends.map((friend) =>
                        friend.friendship.status === 'accepted' ? (
                            <li key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    {`${friend.firstName} ${friend.lastName}`}
                                </Link>
                            </li>
                        ) : null
                    )
                ) : (
                    <Typography>No Friends :(</Typography>
                )}
            </div>
            <div className={classes.right}>
                <div className={classes.search}>
                    <Search />
                </div>
                <div className={classes.pending}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        className={classes.text}
                    >
                        Pending Friend Requests
                    </Typography>
                    {/* <div className={classes.friendReqs}> */}
                    <FriendRequests />
                    {/* </div> */}
                </div>
            </div>
        </div>
    ) : null;
};

export default AllFriends;
