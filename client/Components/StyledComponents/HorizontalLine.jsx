import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    divider: {
        display: 'flex',
        width: '24rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 0rem',
    },
    span: {
        padding: '0rem 0.75rem',
    },
    horizontalLine: {
        color: 'white',
        backgroundColor: 'white',
        height: 0.25,
        width: '100%',
    },
}));

const HorizontalLine = () => {
    const classes = useStyles();
    return (
        <div className={classes.divider}>
            <hr className={classes.horizontalLine} />
            <span className={classes.span}>or</span>
            <hr className={classes.horizontalLine} />
        </div>
    );
};

export default HorizontalLine;
