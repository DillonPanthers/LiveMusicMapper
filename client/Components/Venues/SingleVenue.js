import React, { useContext } from 'react';

import { GlobalState } from '../../contexts/Store';

const SingleVenue = () => {
    const { currSingleVenue } = useContext(GlobalState);
    const [singleVenue, setSingleVenue] = currSingleVenue;
    console.log(singleVenue, 'this is currently the single venue and its data');
    return <div>Hello this is single venue page</div>;
};

export default SingleVenue;
