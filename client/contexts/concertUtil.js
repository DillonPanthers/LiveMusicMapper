import axios from 'axios';

//Pass in concert ID and array of friends
async function attendingFriends(id, friends) {
    const attendees = (await axios.get(`/api/concerts/${id}/attendees`)).data;
    const concertAttendeesId = attendees.map((a) => a.id);
    const concert_friends = friends.filter((friend) =>
        concertAttendeesId.includes(friend.id)
    );
    return [concert_friends, concertAttendeesId];
}

const mutualFriends = (usersFriends, friendsHomies) => {
    //we are getting the ids of the friends of the account we are currently viewing
    const friendHomiesIds = friendsHomies.map((friend) => friend.id);
    //we are mapping and filtering over logged in users friends and seeing if the users friend id exists in the currently viewed page's user's friends list
    const mutuals = usersFriends.filter((friend) =>
        friendHomiesIds.includes(friend.id)
    );

    // console.log(mutuals, 'mutuals in util function here');
    //we are returning an array of the mutual friends here
    return mutuals;
};

export { attendingFriends, mutualFriends };
