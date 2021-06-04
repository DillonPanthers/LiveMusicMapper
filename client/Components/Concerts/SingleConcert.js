import React, { useContext } from 'react';

import { GlobalState } from '../../contexts/Store';

//TODO: Incorporate user in global state for this component
//TODO: Wireframe what we want this page to look like
//TODO: Persist data on hard refresh
//TODO: Pass in concert data destructured, based off what we need

export default function SingleConcert() {
    const { currSingleConcert } = useContext(GlobalState);
    const [singleConcert] = currSingleConcert;
    console.log('Single Concert', singleConcert);
    return <div style={{ color: 'white' }}>Hello this is the event page</div>;
}
