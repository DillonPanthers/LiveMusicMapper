import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TICKETMASTERAPIKEY } from '../../secret';

import { GlobalState } from '../../contexts/Store';
import Cards from '../Card';
import FriendsAttending from './ConcertFriends';

// TODO: Fix CSS

var styles = {
    Default: '#81b71a',
    Blue: '#00B1E1',
    Cyan: '#37BC9B',
    Green: '#8CC152',
    Yellow: '#F6BB42',
};

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

    return (
        <div>
            <Cards props={singleConcert} />
            <FriendsAttending concert={singleConcert} />
        </div>
    );
}
