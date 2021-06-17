import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Avatar, rgbToHex } from '@material-ui/core';

const ConcertFriendsList = ({ classes, friends }) => {
    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.control}>
                    {friends.length ? (
                        <>
                            <Typography
                                variant="body1"
                                color="secondary"
                                className={classes.headline}
                            >
                                FRIENDS ATTENDING
                            </Typography>
                            <Grid container spacing={3}>
                                {friends.map((friend) => (
                                    <Grid
                                        item
                                        className={classes.avatar}
                                        key={friend.id}
                                    >
                                        <Avatar
                                            key={friend.id}
                                            alt={`${friend.firstName} ${friend.lastName}`}
                                            src={`/${friend.imageUrl}`}
                                        ></Avatar>
                                        <Link to={`/user/${friend.id}`}>
                                            <Typography color="secondary">{`${friend.firstName} ${friend.lastName}`}</Typography>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.headline}
                        >
                            No Friends Attending
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ConcertFriendsList;
