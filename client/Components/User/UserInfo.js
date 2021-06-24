import React from 'react';
import { makeStyles } from '@material-ui/core';

import UpcomingEvents from '../Concerts/UpcomingEvents';
import FriendsList from './FriendsList';
import { mutualFriends } from '../../contexts/concertUtil';

//TODO: In all friends, add paper to friends avatars
//TODO: Make width of card responsive in UpcomingEvents component
//TODO: Create Top Artists in UserInfo and add styling to mutual friends in UserInfo
//TODO: Changing Height of upcoming events component
//TODO: Change seed public default for img and replace parts of the code that use it with user.imgUrl

const useStyles = makeStyles(() => ({
    lowerContainer: {
        display: 'flex',
        height: '60vh',
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        marginLeft: '.5rem',
        marginRight: '1rem',
    },
    artist: {
        flex: '2',
        margin: '0.5rem',
        backgroundColor: '#382B71',
    },
    friend: {
        flex: '2',
        margin: '0.5rem',
        backgroundColor: '#382B71',
    },
}));

const UserInfo = ({ concerts, friends, currUserFriends, userId }) => {
    const classes = useStyles();
    const mutuals = mutualFriends(currUserFriends, friends);
    return (
        <div className={classes.lowerContainer}>
            <div>
                <UpcomingEvents
                    concerts={concerts}
                    friends={currUserFriends}
                    userId={userId}
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
