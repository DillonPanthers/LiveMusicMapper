import React, { useEffect, useContext, useState } from 'react';
import { Typography, Button, Container, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';

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

//TODO: Do we really need a block button? Is Add or Remove enough?

function FriendRequests() {
    const { auth, getUserData } = useContext(GlobalState);
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
            console.log('here');
            getFriendRequests();
        }
    }, [user]);

    //should we change this function name to accept friend?
    const acceptFriend = async (requesterId, inviteeId) => {
        await axios.post('/api/user/accept-friend', {
            requesterId,
            inviteeId,
        });
        getFriendRequests();
        await getUserData();
    };

    const rejectFriend = async (requesterId, inviteeId) => {
        await axios.delete('/api/user/reject-friend', {
            data: { requesterId, inviteeId },
        });

        getFriendRequests();
        await getUserData();
    };
    const blockFriend = () => {
        console.log('BLOCK ME');
        //TO DO: Blocking is extra feature
    };

    //TODO: Get button css working
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
