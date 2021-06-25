import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gridGap: '1rem',
        minHeight: '20rem',
        marginTop: '1.5rem',
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
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
    },
}));

const FriendsList = ({ friends, friendNum, text }) => {
    const classes = useStyles();
    const filteredFriends = friends.filter(
        (friend) => friend.friendship.status === 'accepted' && friend.firstName !== 'Craig'
    );
    const friendsNum = friendNum ? friendNum : filteredFriends.length;

    return friends.length ? (
        <>
            <Typography variant="h6">
                {text} {`(${friendsNum})`}
            </Typography>
            <div className={classes.container}>
                {filteredFriends.map((friend) => {
                    return (
                        <div key={friend.id} >
                            <Link
                                to={`/user/${friend.id}`}
                                className={classes.link}
                            >
                                <Paper className={classes.paper}>
                                    <Avatar
                                        className={`${classes.item} ${classes.avatar}`}
                                        src={friend.imageUrl}
                                    >{`${friend.firstName[0]}${friend.lastName[0]}`}</Avatar>
                                    <Typography className={classes.item}>
                                        {`${friend.firstName} ${friend.lastName}`}
                                    </Typography>
                                </Paper>
                            </Link>
                        </div>
                    );
                })}
            </div>{' '}
        </>
    ) : (
        <Typography gutterBottom variant="h6" className={classes.text}>
            {`No ${text}`}
        </Typography>
    );
};

export default FriendsList;
