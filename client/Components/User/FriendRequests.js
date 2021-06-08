import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Container, makeStyles } from '@material-ui/core';

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
    const { auth } = useContext(GlobalState);
    const [user] = auth;
    const [friendRequests, setFriendRequests] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        const getFriendRequests = async () => {
            console.log('first');
            const jwtToken = window.localStorage.getItem('token');
            const requests = await axios.get(`/api/user/friendrequests`, {
                headers: {
                    authorization: jwtToken,
                    spotify: false,
                },
            });
            console.log('Friends', requests.data);
            setFriendRequests(requests.data);
        };
        if (user.id) {
            console.log('here');
            getFriendRequests();
        }
    }, [user]);

    const addFriend = (requesterId, inviteeId) => {
        console.log('ADDD ME', requesterId, inviteeId);
    };
    const ignoreFriend = () => {
        console.log('IGNORE ME');
    };
    const blockFriend = () => {
        console.log('BLOCK ME');
    };

    //TODO: Get button css working
    return (
        <Container>
            {friendRequests.map((request) => {
                console.log(request);

                return (
                    <Container key={request.userId}>
                        <Typography>{request.userInfo.fullName}</Typography>
                        <Button
                            className={classes.button}
                            onClick={() => addFriend(request.userId, user.id)}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={() => ignoreFriend()}
                            className={classes.button}
                        >
                            Ignore
                        </Button>
                        <Button
                            onClick={() => blockFriend()}
                            className={classes.button}
                        >
                            Block
                        </Button>
                    </Container>
                );
            })}
        </Container>
    );
}

export default FriendRequests;
