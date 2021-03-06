import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Avatar } from '@material-ui/core';

const ConcertFriendsList = ({ classes, friends }) => {
    const filteredFriends = friends.filter(
        (friend) => friend.friendship.status === 'accepted'
    );

    return (
        <>
            {friends.length ? (
                <>
                    <Typography variant="h6">Friends Attending</Typography>
                    <div className={classes.container}>
                        {filteredFriends.map((friend) => (
                            <Link
                                to={`/user/${friend.id}`}
                                className={classes.link}
                            >
                                <Paper
                                    className={classes.paper}
                                    key={friend.id}
                                >
                                    <Avatar
                                        className={`${classes.item} ${classes.avatar}`}
                                        key={friend.id}
                                        alt={`${friend.firstName} ${friend.lastName}`}
                                        src={`${friend.imageUrl}`}
                                    />
                                    <Typography className={classes.item}>
                                        {`${friend.firstName} ${friend.lastName}`}
                                    </Typography>
                                </Paper>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <Typography variant="h6">
                        No friends attending this event
                    </Typography>
                </>
            )}
        </>
    );
};

export default ConcertFriendsList;
