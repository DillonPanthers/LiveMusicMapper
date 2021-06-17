import axios from 'axios';

//Pass in concert ID and array of friends
async function attendingFriends(id, friends) {
    const attendees = (await axios.get(`/api/concerts/${id}/attendees`)).data;
    const concertAttendeesId = attendees.map((a) => a.id);
    const concert_friends = friends.filter((friend) =>
        concertAttendeesId.includes(friend.id)
    );
    console.log(concert_friends);
    return concert_friends;
}

export { attendingFriends };
