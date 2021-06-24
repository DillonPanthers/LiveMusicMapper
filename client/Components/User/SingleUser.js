import React, { useContext, useState, useEffect } from 'react';
import { Typography, makeStyles, Avatar, Icon, Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import { SocketContext } from '../../contexts/SocketContext';
import UserInfo from './UserInfo';
import { mutualFriends } from '../../contexts/concertUtil';

import ContainedButton from '../StyledComponents/ContainedButton';
import OutlinedButton from '../StyledComponents/OutlinedButton';
import SpotifyBadge from '../StyledComponents/SpotifyBadge';

const useStyles = makeStyles((theme) => ({
    upperContainer: {
        display: 'flex',
        backgroundColor: 'black',
        padding: '.75rem',
        height: '10rem',
    },
    avatar: {
        margin: '.5rem',
        width: '100px',
        height: '100px',
    },

    spotify: {
        width: '1.5rem',
        height: '1.5rem',
        marginLeft: '.5rem',
    },

    preview: {
        display: 'flex',
        marginLeft: '.5rem',
        flexDirection: 'column',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        flex: '1',
    },

    outlinedButton: {
        margin: '1rem',
        height: '2.5rem',
        width: '8rem',
    },
    containedButton: {
        height: '2.5rem',
        width: '8rem',
    },

    spotifyIcon: {
        display: 'flex',
    },

    link: {
        marginTop: '.6rem',
    },
    text: {
        display: 'flex',
        marginLeft: '.5rem',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem',
    },
}));

function SingleUser(props) {
    const classes = useStyles();

    const { auth, getUserData } = useContext(GlobalState);
    const { addFriend, acceptFriendReq, rejectFriendReq } =
        useContext(SocketContext);
    const [currentUser] = auth;
    const [user, setUser] = useState({});
    const [friendship, setFriendship] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [friends, setFriends] = useState([]);
    const [theMutualFriends, setMutualFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);

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
                const currFriends = currentUser.friends.filter(
                    (friend) => friend.friendship.status === 'accepted'
                );
                const userDataFriends = user.data.friends.filter(
                    (friend) => friend.friendship.status === 'accepted'
                );
                //filter out the pending

                const muts = mutualFriends(currFriends, userDataFriends);

                setMutualFriends(muts);
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

    return (
        <>
            {isLoggedIn ? (
                <>
                    <div className={classes.upperContainer}>
                        <div className={classes.info}>
                            {user.spotifyId &&
                            (user.isPublic || friendship === 'friends') ? (
                                <SpotifyBadge
                                    spotifyId={user.spotifyId}
                                    imageUrl={user.imageUrl}
                                />
                            ) : (
                                <Avatar
                                    className={classes.avatar}
                                    src={user.imageUrl}
                                />
                            )}

                            <div className={classes.preview}>
                                <div className={classes.spotifyIcon}>
                                    <div className={classes.userInfo}>
                                        <Typography variant="h4">
                                            {`${user.firstName} ${user.lastName}`}
                                        </Typography>
                                        <Typography>{`Attending ${user.concerts.length} Events |  ${theMutualFriends.length} Mutual Friends`}</Typography>
                                    </div>
                                </div>
                                {friendship === 'friends' ? (
                                    <></>
                                ) : (
                                    <div>
                                        <ContainedButton
                                            onClick={onButtonClick}
                                            variant="contained"
                                            className={classes.containedButton}
                                        >
                                            {friendship === 'notFriends'
                                                ? 'add friend'
                                                : friendship === 'sentRequest'
                                                ? 'requested'
                                                : 'accept friend'}
                                        </ContainedButton>
                                        {friendship === 'recievedRequest' ? (
                                            <OutlinedButton
                                                onClick={() =>
                                                    rejectFriend(user)
                                                }
                                                variant="outlined"
                                                className={
                                                    classes.outlinedButton
                                                }
                                            >
                                                Reject
                                            </OutlinedButton>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={classes.text}>
                            {user.spotifyId &&
                            (user.isPublic || friendship === 'friends') ? (
                                <>
                                    <Typography>{`Top Genre: ${
                                        Object.keys(user.ticketmasterGenres)[0]
                                    }`}</Typography>
                                    <Typography>{`Top Artists: ${Object.keys(
                                        user.artists
                                    )
                                        .slice(0, 3)
                                        .join(' | ')}`}</Typography>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div>
                        {/*user profile */}
                        {isProfile ? (
                            <Redirect to="/dashboard" />
                        ) : friendship === 'friends' || user.isPublic ? (
                            <UserInfo
                                concerts={user.concerts}
                                friends={user.friends.filter(
                                    (friend) =>
                                        friend.friendship.status === 'accepted'
                                )}
                                currUserFriends={currentUser.friends.filter(
                                    (friend) =>
                                        friend.friendship.status === 'accepted'
                                )}
                                userId={user.id}
                            />
                        ) : (
                            <div></div>
                        )}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default SingleUser;
