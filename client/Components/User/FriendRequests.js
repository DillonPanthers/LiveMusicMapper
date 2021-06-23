import React, { useEffect, useContext, useState } from 'react';
import { Typography, Button, Avatar, makeStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import { socket, SocketContext } from '../../contexts/SocketContext';

//TODO: Fix with CSS
const useStyles = makeStyles((theme) => ({
    margin: theme.spacing(1),
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        alignItems: 'flex-start',
    },
    button: {
        color: 'white',
        backgroundColor: 'gray',
        maxHeight: '20px',
        marginRight: '5px',
        marginLeft: '5px',
    },
    friend: {
        margin: '0.5rem',
    },
    link: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0.5rem',
        textDecoration: 'none',
        '&:hover': {
            color: '#1DE9B6',
        },
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
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
        <div className={classes.root}>
            {friendRequests.map((request) => {
                return (
                    <div key={request.userId} className={classes.friend}>
                        <Link
                            className={classes.link}
                            to={`/user/${request.userId}`}
                        >
                            <Avatar
                                src={request.userInfo.imageUrl}
                            >{`${request.userInfo.firstName[0]}${request.userInfo.lastName[0]}`}</Avatar>
                            <div className={classes.name}>
                                {request.userInfo.fullName}
                            </div>
                        </Link>

                        <Button
                            className={classes.button}
                            onClick={() =>
                                acceptFriend(request.userId, user.id)
                            }
                        >
                            Add
                        </Button>
                        <Button
                            onClick={() =>
                                rejectFriend(request.userId, user.id)
                            }
                            className={classes.button}
                        >
                            Reject
                        </Button>
                        {/* <Button
                            onClick={() => blockFriend()}
                            className={classes.button}
                        >
                            Block
                        </Button> */}
                    </div>
                );
            })}
        </div>
    ) : (
        <Typography>No pending friend Requests</Typography>
    );
}

export default FriendRequests;
