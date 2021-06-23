import React from 'react';
import { makeStyles } from '@material-ui/core';

import UpcomingEvents from '../Concerts/UpcomingEvents';
import FriendsList from './FriendsList';
import { mutualFriends } from '../../contexts/concertUtil';

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
    list: {
        flex: '2',
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
                <div className={classes.list}>Top Artists</div>
                <div className={classes.list}>
                    <FriendsList friends={mutuals} text="Mutual Friends" />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
