import React from 'react';
import { BounceLoader } from 'react-spinners';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    text: {
        margin: '1rem',
        fontSize: '1.25rem',
    },
}));

const Loading = ({ loading }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BounceLoader
                color={'#1DE9B6'}
                loading={loading}
                // css={override}
                size={50}
            />
            <Typography className={classes.text}>Loading</Typography>
        </div>
    );
};

export default Loading;
