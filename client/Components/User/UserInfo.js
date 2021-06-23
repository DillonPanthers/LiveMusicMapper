import React from 'react';
import { makeStyles } from '@material-ui/core';

import UpcomingEvents from '../Concerts/UpcomingEvents';
import FriendsList from './FriendsList';
import { mutualFriends } from '../../contexts/concertUtil';

//TODO: In all friends, add paper to friends avatars
//TODO: Let Vikki know about the main page not being responsive because it blocks functionality.
//TODO: Make width of card responsive in UpcomingEvents component
//TODO: Create Top Artists in UserInfo and add styling to mutual friends in UserInfo

const useStyles = makeStyles(() => ({
    lowerContainer: {
        display: 'flex',
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

const UserInfo = ({ concerts, friends, currUserFriends }) => {
    const classes = useStyles();
    const mutuals = mutualFriends(currUserFriends, friends);
    console.log(mutuals, 'mutuals here');

    return (
        <div className={classes.lowerContainer}>
            <UpcomingEvents concerts={concerts} friends={friends} />
            <div className={classes.right}>
                <div className={classes.artist}>Top Artists</div>
                <div className={classes.friend}>
                    <FriendsList friends={mutuals} text="Mutual Friends" />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
