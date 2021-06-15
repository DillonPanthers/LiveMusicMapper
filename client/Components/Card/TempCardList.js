import React, { useContext, useState } from 'react';
import { GlobalState } from '../../contexts/Store';
import TempCard from './TempCard';

const ConcertCardList = () => {
    const { currSingleVenue, auth } = useContext(GlobalState);
    const [currentVenue, setCurrentVenue] = currSingleVenue;
    const [user, setUser] = auth;
    let venueData = null;

    const isAttending = (concertId) => {
        if (user.id) {
            return user.concerts.some((concert) => concert.id === concertId);
        } else return false;
    };

    if (Object.keys(currentVenue).length > 0) {
        venueData = currentVenue.venueEvents.map((concert) => (
            <TempCard
                key={concert.id}
                concertData={concert}
                isAttending={isAttending(concert.id)}
            />
        ));
    }

    return <div>{venueData}</div>;
};

export default ConcertCardList;
