import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Paper, makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     text: {
//         padding: '.5rem',
//     },
//     link: {
//         textDecoration: 'none',
//         color: 'white',
//         '&:hover': {
//             color: '#1DE9B6',
//         },
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         '& *': {
//             margin: '.5rem',
//         },
//     },

//     individual: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         flexBasis: '30%',
//         margin: '.6rem',
//     },

//     avatar: {
//         width: '75px',
//         height: '75px',
//     },
// }));
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gridGap: '1rem',
    },
    paper: {
        padding: '1rem',
        width: '7rem',
        height: '8.5rem',
        background: theme.palette.background.default,
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
    control: {
        padding: theme.spacing(2),
        width: '30vw',
        height: '30vh',
        overflow: 'scroll',
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
    },
}));

const FriendsList = ({ friends, numOfFriends, text }) => {
    const classes = useStyles();
    const friendsNum = numOfFriends ? numOfFriends : friends.length;
    return friends.length ? (
        <>
            <Typography variant="h6">
                {text} {`(${friendsNum})`}
            </Typography>
            <div className={classes.container}>
                {friends.map((friend) => {
                    return friend.friendship.status === 'accepted' ? (
                        <div key={friend.id} className={classes.individual}>
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
                    ) : null;
                })}
            </div>{' '}
        </>
    ) : (
        <div>
            <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}
            >
                {'No Friends :('}
            </Typography>
        </div>
    );
};

export default FriendsList;
