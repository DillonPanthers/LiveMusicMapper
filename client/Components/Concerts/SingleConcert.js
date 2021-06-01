import React, { useContext } from 'react';

import { GlobalState } from '../../contexts/Store';

//TODO: Incorporate user in global state for this component
//TODO: Wireframe what we want this page to look like

export default function SingleConcert() {
    const { currSingleConcert } = useContext(GlobalState);
    const [singleConcert] = currSingleConcert;

    return <div style={{ color: 'white' }}>Hello this is the event page</div>;
}
