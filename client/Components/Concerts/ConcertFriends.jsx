import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from '../../contexts/Store';
import { attendingFriends } from '../../contexts/concertUtil';
import ConcertFriendsList from './ConcertFriendList';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gridGap: '1rem',
    },
    paper: {
        padding: '1rem',
        width: '7rem',
        height: '8.5rem',
        background: '#000021',
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.background.default,
            boxShadow: '2px 2px 5px #01072a',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: '0.75rem',
    },
    item: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: theme.palette.accent.main,
    },
    control: {
        padding: theme.spacing(2),
        width: '30vw',
        height: '30vh',
        overflow: 'auto',
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
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
            const [concert_friends, attendees] = await attendingFriends(
                concert.id,
                friends
            );
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
