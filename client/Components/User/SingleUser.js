import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import { SocketContext } from '../../contexts/SocketContext';
import UserInfo from './UserInfo';

//TODO: update some css and make look better
//TODO: Components for User Info

function SingleUser(props) {
    const { auth, getUserData } = useContext(GlobalState);
    const { addFriend, acceptFriendReq, rejectFriendReq } =
        useContext(SocketContext);
    const [currentUser] = auth;
    const [user, setUser] = useState({});
    const [friendship, setFriendship] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // console.log('auth here useeffect', currentUser);
        const { id } = props.match.params;
        if (id === currentUser.id) {
            setIsProfile(true);
        }

        const getUser = async () => {
            const { id } = props.match.params;
            const user = await axios.get(`/api/user/${id}`);
            setUser(user.data);
            setFriends(user.data.friends);
            if (currentUser.id) {
                setFriendship(checkStatus());
                setIsLoggedIn(true);
            }
        };

        const checkStatus = () => {
            const areFriends = currentUser.friends.some(
                (friend) =>
                    friend.id === props.match.params.id &&
                    friend.friendship.status === 'accepted'
            );

            if (areFriends) {
                return 'friends';
            } else {
                const sentRequest = currentUser.friends.some(
                    (friend) =>
                        friend.id === props.match.params.id &&
                        friend.friendship.status === 'pending'
                );
                if (sentRequest) {
                    return 'sentRequest';
                } else {
                    const userFriends = user.friends || [];
                    const recievedRequest = userFriends.some(
                        (friend) =>
                            friend.id === currentUser.id &&
                            friend.friendship.status === 'pending'
                    );
                    return recievedRequest ? 'recievedRequest' : 'notFriends';
                }
            }
        };
        getUser();
    }, [props.match.params.id, currentUser, user.id, friends.length]);

    const onButtonClick = async (event) => {
        const action = event.target.innerHTML;
        const friendId = user.id;
        const userId = currentUser.id;
        if (action === 'add friend') {
            await axios.post('/api/user/add-friend', {
                friendId,
                userId,
            });
            getUserData();
            addFriend(friendId);
        } else if (action === 'accept friend') {
            await axios.post('/api/user/accept-friend', {
                requesterId: friendId,
                inviteeId: userId,
            });
            acceptFriendReq(friendId);
            await getUserData();
        }
    };

    const rejectFriend = async (onPageUser) => {
        const requesterId = onPageUser.id;
        const inviteeId = currentUser.id;
        await axios.delete('/api/user/reject-friend', {
            data: { requesterId, inviteeId },
        });
        const user = await axios.get(`/api/user/${requesterId}`);
        setUser(user.data);
        setFriends(user.data.friends);
        rejectFriendReq(requesterId);
    };

    return isLoggedIn ? (
        <Container>
            <Container>{user.fullName ? user.fullName : null}</Container>
            {friendship === 'friends' ? (
                <Typography>you are friends!</Typography>
            ) : (
                //BUTTONS

                <Container>
                    <Button onClick={onButtonClick} variant="contained">
                        {friendship === 'notFriends'
                            ? 'add friend'
                            : friendship === 'sentRequest'
                            ? 'requested'
                            : 'accept friend'}
                    </Button>{' '}
                    {friendship === 'recievedRequest' ? (
                        <Button
                            onClick={() => rejectFriend(user)}
                            variant="contained"
                        >
                            Reject
                        </Button>
                    ) : null}
                </Container>
            )}
            {/*user profile */}
            {isProfile ? (
                <Redirect to="/dashboard" />
            ) : friendship === 'friends' || user.isPublic ? (
                <UserInfo />
            ) : (
                <div>Private Profile</div>
            )}
        </Container>
    ) : (
        <div>Private Profile</div>
    );
}

export default SingleUser;
