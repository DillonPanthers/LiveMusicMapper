import React from 'react';
import { BounceLoader } from 'react-spinners';
import { makeStyles, Typography, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1000,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem',
        borderRadius: '10%',
        backgroundColor: 'rgba(0,10,60,0.8)',
    },
    text: {
        fontSize: '1.25rem',
        marginTop: '1.5rem',
    },
}));

const Loading = ({ loading }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <BounceLoader color={'#1DE9B6'} loading={loading} size={50} />
                <Typography className={classes.text}>Loading</Typography>
            </Card>
        </div>
    );
};

export default Loading;
