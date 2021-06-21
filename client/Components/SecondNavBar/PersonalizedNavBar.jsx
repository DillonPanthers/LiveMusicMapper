import React, { useContext, useState } from 'react';
import { makeStyles, AppBar, Toolbar, Icon } from '@material-ui/core';

import { TICKETMASTERAPIKEY } from '../../secret';
import { GlobalState } from '../../contexts/Store';

import ContainedButton from '../StyledComponents/ContainedButton';
import OutlinedButton from '../StyledComponents/OutlinedButton';
import Filter from './FilterMap';
import LoadingOnCard from '../Loading/LoadingOnCard';

import {
    getEvents,
    getTopArtistsEvents,
    getRecommendedArtistsEvents,
    getTopGenresEvents,
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

    const {
        location,
        venues,
        theRadius,
        auth,
        genres,
        mapViews,
        personalization,
    } = useContext(GlobalState);

    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [radius, setRadius] = theRadius;
    const [user, setUser] = auth;
    let [genre, setGenre] = genres;
    const [mapView, setMapView] = mapViews;
    const [personalized, setPersonalized] = personalization;

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    const [eventsLoading, setEventsLoading] = useState(false);

    const getAllEvents = async () => {
        setEventsLoading(true);
        setGenre('');
        genre = '';
        let tmEvents = await getEvents(locationData, radius, genre);

        const venueObj = await getVenueObject(tmEvents);

        setVenues(venueObj);
        setMapView('');
        setPersonalized(false);
        setEventsLoading(false);
    };

    const getAllTopArtistsEvents = async () => {
        setEventsLoading(true);
        let tmEvents = await getTopArtistsEvents(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
        setMapView('topArtists');
        setPersonalized(true);
        setGenre('');
        setEventsLoading(false);
    };

    const getAllRecommendedArtistsEvents = async () => {
        setEventsLoading(true);
        let tmEvents = await getRecommendedArtistsEvents(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
        setMapView('recommendedArtists');
        setPersonalized(true);
        setGenre('');
        setEventsLoading(false);
    };

    const getAllTopGenres = async () => {
        setEventsLoading(true);
        let tmEvents = await getTopGenresEvents(
            user,
            locationData,
            radius,
            TICKETMASTERAPIKEY
        );

        const venueObj = await getVenueObject(tmEvents);
        setVenues(venueObj);
        setMapView('topGenres');
        setPersonalized(true);
        setGenre('');
        setEventsLoading(false);
    };

    return (
        <div>
            {eventsLoading ? <LoadingOnCard loading={eventsLoading} /> : <></>}
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
