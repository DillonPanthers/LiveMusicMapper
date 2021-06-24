import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import EventInfo from './EventInfo';

const useStyles = makeStyles((theme) => ({
    left: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1.5rem 0.75rem 1.5rem 0.75rem',
        flex: '1',
        backgroundColor: '#363073',
        padding: '1.5rem',
        alignItems: 'center',
        textAlign: 'left',
        overflowY: 'scroll',
        height: '39.5rem',
    },
}));

const UpcomingEvents = ({ concerts, friends, userId }) => {
    const classes = useStyles();
    const filteredFriends = userId
        ? friends.filter((friend) => friend.id !== userId)
        : friends;

    return (
        <div className={classes.left}>
            <Typography variant="h6" gutterBottom>
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
