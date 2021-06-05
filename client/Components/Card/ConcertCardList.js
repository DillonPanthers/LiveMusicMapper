import React, { useContext } from 'react';
import { GlobalState } from '../../contexts/Store';
import ConcertCard from './ConcertCard';

const ConcertCardList = () => {
    const { currSingleVenue } = useContext(GlobalState);
    const [currentVenue, setCurrentVenue] = currSingleVenue;
    let venueData = null;

    if (Object.keys(currentVenue).length > 0) {
        venueData = currentVenue.venueEvents.map((concert) => (
            <ConcertCard key={concert.id} concertData={concert} />
        ));
    }

    return <div>{venueData}</div>;
};

export default ConcertCardList;
