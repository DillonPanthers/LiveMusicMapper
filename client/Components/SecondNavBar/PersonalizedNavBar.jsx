import React, { useContext, useState } from 'react';
import { makeStyles, AppBar, Toolbar, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { TICKETMASTERAPIKEY } from '../../secret';
import { GlobalState } from '../../contexts/Store';

import ContainedButton from '../StyledComponents/ContainedButton';
import OutlinedButton from '../StyledComponents/OutlinedButton';
import Filter from './FilterMap';

import {
    getEvents,
    getTopArtistsEvents,
    getRecommendedArtistsEvents,
    getTopGenres,
    getVenueObject,
} from './utils';

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
        borderColor: '#FF5000',
        color: '#FF5000',
        margin: '1rem 0.5rem 1rem 0.5rem',
    },
    containedButton: {
        height: '2.75rem',
        width: '10rem',
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

const PersonalizedNavBar = (props) => {
    const classes = useStyles();

    const { location, venues, theRadius, auth } = useContext(GlobalState);

    // TODO: Create this in the store
    // add use state logic to change marker color
    // const [personalized, setPersonalized] = useState('false');

    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [radius, setRadius] = theRadius;
    const [user, setUser] = auth;

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    const getAllEvents = async () => {
        let tmEvents = await getEvents(
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
    };

    const getAllTopArtistsEvents = async () => {
        let tmEvents = await getTopArtistsEvents(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
    };

    const getAllRecommendedArtistsEvents = async () => {
        let tmEvents = await getRecommendedArtistsEvents(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
    };

    const getAllTopGenres = async () => {
        let tmEvents = await getTopGenres(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
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
                    <ContainedButton
                        startIcon={svgIcon}
                        className={classes.containedButton}
                        onClick={getAllTopArtistsEvents}
                    >
                        TOP ARTISTS
                    </ContainedButton>
                    <ContainedButton
                        startIcon={svgIcon}
                        className={classes.containedButton}
                        onClick={getAllRecommendedArtistsEvents}
                    >
                        RECOMMENDED ARTISTS
                    </ContainedButton>
                    <ContainedButton
                        startIcon={svgIcon}
                        className={classes.containedButton}
                        onClick={getAllTopGenres}
                    >
                        TOP GENRES
                    </ContainedButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default PersonalizedNavBar;
