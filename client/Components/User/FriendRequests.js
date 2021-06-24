import React, { useEffect, useContext, useState } from 'react';
import {
    Typography,
    Button,
    Avatar,
    makeStyles,
    Paper,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import { socket, SocketContext } from '../../contexts/SocketContext';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: '2',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gridGap: '1rem',
        alignItems: 'flex-start',
        margin: '0rem 1.5rem',
    },
    paper: {
        padding: '0.75rem',
        width: '7rem',
        height: '12rem',
        background: '#000021',
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.background.default,
            boxShadow: '2px 2px 5px #01072a',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '0.5rem',
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
    button: {
        color: 'white',
        backgroundColor: 'gray',
        width: '5rem',
        height: '1.5rem',
        zIndex: '100',
    },
    link: {
        alignSelf: 'center',
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'black',
        },
    },
    newAvatar: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

function FriendRequests() {
    const { auth, getUserData } = useContext(GlobalState);
    const { acceptFriendReq, rejectFriendReq } = useContext(SocketContext);

    const [user] = auth;
    const [friendRequests, setFriendRequests] = useState([]);
    const classes = useStyles();

    const getFriendRequests = async () => {
        const jwtToken = window.localStorage.getItem('token');
        const requests = await axios.get(`/api/user/friendrequests`, {
            headers: {
                authorization: jwtToken,
                spotify: false,
            },
        });
        setFriendRequests(requests.data);
    };

    useEffect(() => {
        if (user.id) {
            getFriendRequests();
        }

        socket.on('newFriendRequest', async (userId) => {
            getFriendRequests();
            await getUserData();
        });

        socket.on('acceptedRequest', async () => {
            getFriendRequests();
            await getUserData();
        });

        socket.on('rejected', async (userId) => {
            getFriendRequests();
            await getUserData();
        });
    }, [user]);

    const acceptFriend = async (requesterId, inviteeId) => {
        await axios.post('/api/user/accept-friend', {
            requesterId,
            inviteeId,
        });
        acceptFriendReq(requesterId);
        getFriendRequests();
        await getUserData();
    };

    const rejectFriend = async (requesterId, inviteeId) => {
        await axios.delete('/api/user/reject-friend', {
            data: { requesterId, inviteeId },
        });

        rejectFriendReq(requesterId);
        getFriendRequests();
        await getUserData();
    };

    return friendRequests.length > 0 ? (
        <div className={classes.container}>
            {friendRequests.map((request) => {
                return (
                    <div key={request.userId}>
                        <Paper className={classes.paper}>
                            <Link
                                to={`/user/${request.userId}`}
                                className={classes.link}
                            >
                                <div className={classes.newAvatar}>
                                    <Avatar
                                        className={`${classes.item} ${classes.avatar}`}
                                        src={request.userInfo.imageUrl}
                                    >{`${request.userInfo.firstName[0]}${request.userInfo.lastName[0]}`}</Avatar>
                                </div>
                                <Typography className={classes.item}>
                                    {request.userInfo.fullName}
                                </Typography>
                            </Link>
                            <Button
                                className={`${classes.item} ${classes.button}`}
                                onClick={() =>
                                    acceptFriend(request.userId, user.id)
                                }
                            >
                                ADD
                            </Button>
                            <Button
                                onClick={() =>
                                    rejectFriend(request.userId, user.id)
                                }
                                className={`${classes.item} ${classes.button}`}
                            >
                                REJECT
                            </Button>
                        </Paper>
                    </div>
                );
            })}
        </div>
    ) : (
        <Typography className={classes.container}>
            No pending friend Requests
        </Typography>
    );
}

export default FriendRequests;
