import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import EventInfo from './EventInfo';

const useStyles = makeStyles((theme) => ({
    left: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1rem',
        marginRight: '.5rem',
        flex: '1',
        backgroundColor: 'rgba(20, 20, 30, 0.8)',
        padding: '.5rem',
        overflowY: 'scroll',
        height: '85vh',
    },
    text: {},
}));

const UpcomingEvents = ({ concerts, friends, userId }) => {
    const classes = useStyles();
    const filteredFriends = userId
        ? friends.filter((friend) => friend.id !== userId)
        : friends;

    return (
        <div className={classes.left}>
            <Typography className={classes.text} variant="h5">
                {`Upcoming Events (${concerts.length})`}
            </Typography>
            {concerts.map((concert) => (
                <EventInfo
                    key={concert.id}
                    concertInfo={concert}
                    friends={filteredFriends}
                />
            ))}
        </div>
    );
};

export default UpcomingEvents;
