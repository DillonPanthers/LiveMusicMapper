import React from 'react';
import { makeStyles } from '@material-ui/core';

import UpcomingEvents from '../Concerts/UpcomingEvents';
import FriendsList from './FriendsList';
import { mutualFriends } from '../../contexts/concertUtil';

const useStyles = makeStyles(() => ({
    lowerContainer: {
        display: 'flex',
        height: '20vh',
    },
    container: {
        height: '60vh',
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        margin: '1.5rem 0.75rem',
        height: '40vh',
        overflow: 'auto',
    },
    artist: {
        flex: '2',
        margin: '0.5rem',
        backgroundColor: '#382B71',
    },
    friend: {
        flex: '2',
        backgroundColor: '#382B71',
        padding: '1.5rem',
        height: '40rem',
    },
}));

const UserInfo = ({
    concerts,
    friends,
    currUserFriends,
    userId,
    loggedInUserId,
}) => {
    const classes = useStyles();
    const mutuals = mutualFriends(currUserFriends, friends);
    return (
        <div className={classes.lowerContainer}>
            <div className={classes.container}>
                <UpcomingEvents
                    concerts={concerts}
                    friends={currUserFriends}
                    userId={userId}
                    loggedInUserId={loggedInUserId}
                />
            </div>
            <div className={classes.right}>
                <div className={classes.friend}>
                    <FriendsList friends={mutuals} text="Mutual Friends" />
                </div>
                {/* <div className={classes.artist}></div> */}
            </div>
        </div>
    );
};

export default UserInfo;
