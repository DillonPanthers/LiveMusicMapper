import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Icon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ContainedButton from '../Buttons/ContainedButton';
import OutlinedButton from '../Buttons/OutlinedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: 'rgba(10,10,0,0.70)',
        position: 'absolute',
        paddingTop: '10vh',
        zIndex: '1',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    button: {
        height: 48,
        padding: '0 30px',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none',
        borderRadius: 50,
        borderColor: '#1DE9B6',
        color: '#1DE9B6',
        lineHeight: '125%',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
        '&:hover': {
            color: 'white',
        },
    },
}));

const SecondNavBar = (props) => {
    const classes = useStyles();

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <OutlinedButton variant="outlined">
                        SHOW ALL EVENTS NEARBY
                    </OutlinedButton>
                    <OutlinedButton variant="outlined">
                        FILTER EVENTS BY GENRE
                    </OutlinedButton>
                    <ContainedButton startIcon={svgIcon}>
                        CONNECT WITH SPOTIFY TO PERSONALIZE YOUR EXPERIENCE
                    </ContainedButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default SecondNavBar;
