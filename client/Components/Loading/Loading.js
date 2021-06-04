import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({ loading }) => {
    return (
        <div>
            <ClipLoader
                color={'red'}
                loading={loading}
                // css={override}
                size={50}
            />
            Loading...
        </div>
    );
};

export default Loading;
