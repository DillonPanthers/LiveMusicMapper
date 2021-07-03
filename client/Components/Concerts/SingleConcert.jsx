import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import ConcertInfo from './ConcertInfo';

export default function SingleConcert(props) {
    const { id } = props.match.params;
    const { currSingleConcert } = useContext(GlobalState);
    const [singleConcert, setSingleConcert] = currSingleConcert;
    const [artistName, setArtistName] = useState('');

    useEffect(() => {
        const getConcert = async (id) => {
            const singleConcertData = await axios.get(
                `/api/ticketmaster/concert/${id}`
            );
            const artist = singleConcertData.data._embedded.attractions
                ? singleConcertData.data._embedded.attractions[0].name
                : '';
            setArtistName(artist);
            setSingleConcert(singleConcertData.data);
        };
        if (id) {
            getConcert(id);
        }
    }, [id]);

    return (
        <div>
            <ConcertInfo
                single_concert={singleConcert}
                artistName={artistName}
            />
        </div>
    );
}
