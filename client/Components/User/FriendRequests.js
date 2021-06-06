import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../../contexts/Store';

function FriendRequests() {
    const { auth } = useContext(GlobalState);
    const [user] = auth;
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const getFriendRequests = async () => {
            console.log('first');
            const requests = await axios.get(
                `/api/user/${user.id}/friendrequests`
            );
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

    return (
        <div>
            {friendRequests.map((request) => {
                console.log(request);

                return (
                    <div key={request.userId}>
                        {request.userInfo.fullName}{' '}
                        <button
                            onClick={() => addFriend(request.userId, user.id)}
                        >
                            Add
                        </button>
                        <button onClick={() => ignoreFriend()}>Ignore</button>
                        <button onClick={() => blockFriend()}>Block</button>
                    </div>
                );
            })}
        </div>
    );
}

export default FriendRequests;
