import React, { useEffect, useContext, useState } from 'react';
import { Typography, Button, Container, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import { socket, SocketContext } from '../../contexts/SocketContext';

//TODO: Fix with CSS
const useStyles = makeStyles((theme) => ({
    margin: theme.spacing(1),
    button: {
        color: 'white',
        backgroundColor: 'gray',
        maxHeight: '20px',
        marginRight: '5px',
        marginLeft: '5px',
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
        <Container>
            {friendRequests.map((request) => {
                return (
                    <Container key={request.userId}>
                        <Typography>
                            <Link to={`/user/${request.userId}`}>
                                {request.userInfo.fullName}
                            </Link>
                        </Typography>
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
                    </Container>
                );
            })}
        </Container>
    ) : (
        <Typography>No pending friend Requests</Typography>
    );
}

export default FriendRequests;
