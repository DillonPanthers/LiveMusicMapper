import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { GlobalState } from '../../contexts/Store';
import { attendingFriends } from '../../contexts/concertUtil';
import ConcertFriendsList from './ConcertFriendList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 50,
    },
    control: {
        padding: theme.spacing(2),
        width: '30vw',
        height: '30vh',
        overflow: 'scroll',
    },
    avatar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headline: {
        padding: 10,
    },
}));

function FriendsAttending({ concert }) {
    const classes = useStyles();
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    const [friends, setFriends] = useState([]);
    const [concertFriends, setConcertFriends] = useState([]);

    useEffect(() => {
        const grabFriends = async () => {
            const concert_friends = await attendingFriends(concert.id, friends);
            setConcertFriends(concert_friends);
        };
        if (user.id && concert.id) {
            setFriends(user.friends);
        }
        if (friends.length) {
            grabFriends();
        }
    }, [user.id, concert.id, friends.length]);

    return user.id ? (
        <ConcertFriendsList friends={concertFriends} classes={classes} />
    ) : null;
}

export default FriendsAttending;
