import React, { useEffect, useContext } from 'react';
import { GlobalState } from '../../contexts/Store';
import { Typography, makeStyles } from '@material-ui/core';

import FriendRequests from './FriendRequests';
import Search from './Search';
import FriendsList from './FriendsList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '0rem 0.75rem',
    },
    right: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        margin: '1.5rem 0.75rem',
        height: '87vh',
    },
    left: {
        backgroundColor: '#382B71',
        flex: '2',
        margin: '1.5rem 0.75rem',
        height: '87vh',
        padding: '1.5rem',
        overflowY: 'scroll',
    },
    search: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        marginBottom: '1.5rem',
        backgroundColor: '#382B71',
    },
    pending: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        backgroundColor: '#382B71',
        overflowY: 'scroll',
    },
    text: {
        padding: '1.5rem',
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
                <FriendsList friends={user.friends} text="Friends" />
            </div>
            <div className={classes.right}>
                <div className={classes.search}>
                    <Search />
                </div>
                <div className={classes.pending}>
                    <Typography variant="h6" className={classes.text}>
                        Pending Friend Requests
                    </Typography>
                    <FriendRequests />
                </div>
            </div>
        </div>
    ) : null;
};

export default AllFriends;
