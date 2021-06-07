import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TICKETMASTERAPIKEY } from '../../secret';

import { GlobalState } from '../../contexts/Store';

//TODO: Incorporate user in global state for this component
//TODO: Wireframe what we want this page to look like
//TODO: Persist data on hard refresh
//TODO: Pass in concert data destructured, based off what we need

export default function SingleConcert(props) {
    const { id } = props.match.params;
    const { currSingleConcert } = useContext(GlobalState);
    const [singleConcert, setSingleConcert] = currSingleConcert;

    useEffect(() => {
        const getConcert = async (id) => {
            const singleConcertData = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${TICKETMASTERAPIKEY}`
            );
            setSingleConcert(singleConcertData.data);
        };
        if (id) {
            getConcert(id);
        }
    }, [id]);
    console.log('single concert', singleConcert);
    return <div style={{ color: 'white' }}>Hello this is the event page</div>;
}
