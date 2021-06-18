import React, { useContext } from 'react';
import { makeStyles, AppBar, Toolbar, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { TICKETMASTERAPIKEY } from '../../secret';
import { GlobalState } from '../../contexts/Store';

import ContainedButton from '../StyledComponents/ContainedButton';
import OutlinedButton from '../StyledComponents/OutlinedButton';
import Filter from './FilterMap';

import { getEvents, getVenueObject } from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    appBar: {
        backgroundColor: 'rgba(20,20,30,0.80)',
        position: 'absolute',
        paddingTop: '9vh',
        zIndex: '1',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    outlinedButton: {
        height: '2.75rem',
        width: '10rem',
        padding: '0.5rem',
        fontSize: '0.65rem',
        margin: '1rem 0.5rem 1rem 0.5rem',
        borderColor: '#FF5000',
        color: '#FF5000',
    },
    containedButton: {
        height: '2.75rem',
        width: '18rem',
        fontSize: '0.65rem',
        margin: '1rem 0.5rem 1rem 0.5rem',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
        '&:hover': {
            color: 'white',
        },
    },
    verticalLine: {
        borderLeft: '0.1rem solid white',
        height: '3rem',
        margin: '1rem',
    },
}));

const GuestNavBar = (props) => {
    const classes = useStyles();

    const { location, venues, theRadius, genres } = useContext(GlobalState);

    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [radius, setRadius] = theRadius;
    let [genre, setGenre] = genres;

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    const getAllEvents = async () => {
        setGenre('');
        genre = '';
        console.log('genre', genre);
        let tmEvents = await getEvents(
            locationData,
            radius,
            TICKETMASTERAPIKEY,
            genre
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
    };

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.root}>
                    <OutlinedButton
                        className={classes.outlinedButton}
                        variant="outlined"
                        onClick={getAllEvents}
                    >
                        SHOW ALL EVENTS NEARBY
                    </OutlinedButton>
                    <Filter />
                    <div className={classes.verticalLine}></div>
                    <Link to="/login" className={classes.link}>
                        <ContainedButton
                            startIcon={svgIcon}
                            className={classes.containedButton}
                        >
                            CONNECT WITH SPOTIFY TO PERSONALIZE YOUR EXPERIENCE
                        </ContainedButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default GuestNavBar;
