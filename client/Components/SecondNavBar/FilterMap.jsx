import React, { useState, useContext, useEffect } from 'react';
import { MenuItem, Menu, makeStyles } from '@material-ui/core';
import axios from 'axios';

import { TICKETMASTERAPIKEY } from '../../secret';
import { GlobalState } from '../../contexts/Store';
import { getVenueObject, getEvents } from './utils';

import OutlinedButton from '../StyledComponents/OutlinedButton';

const useStyles = makeStyles((theme) => ({
    menu: {
        height: '30vh',
        width: '14rem',
    },
    menuItem: {
        color: 'black',
        '&:focus': {
            backgroundColor: theme.palette.accent.main,
            color: theme.palette.text.primary,
        },
    },
    button: {
        height: '2.75rem',
        width: '10rem',
        padding: '0.5rem',
        fontSize: '0.65rem',
        borderColor: '#FF5000',
        color: '#FF5000',
        margin: '1rem 0.5rem 1rem 0.5rem',
    },
}));

const Filter = () => {
    let classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState();
    const [genreList, setGenres] = useState([]);

    const { location, venues, genres, theRadius, mapViews, personalization } =
        useContext(GlobalState);

    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [genre, setGenre] = genres;
    const [radius, setRadius] = theRadius;
    const [mapView, setMapView] = mapViews;
    const [personalized, setPersonalized] = personalization;

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    let closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const getGenres = async () => {
            const genreList = await axios.get(`/api/genre`);
            setGenres(genreList.data);
        };
        getGenres();
    }, []);

    // grabs a genre's name using its for the button label
    const getGenreName = (genre, genreList) => {
        for (let _genre of genreList) {
            if (_genre.id === genre) {
                return _genre.name.toUpperCase();
            }
        }
    };

    const genreLabel =
        genre !== '' ? `: ${getGenreName(genre, genreList)}` : '';

    const filterMapData = async (event) => {
        const { myValue } = event.currentTarget.dataset;

        const events = await getEvents(
            locationData,
            radius,
            TICKETMASTERAPIKEY,
            myValue
        );

        const venueObj = await getVenueObject(events);

        setGenre(myValue);
        setVenues(venueObj);
        setMapView('');
        setPersonalized(false);
    };

    return (
        <>
            <OutlinedButton
                className={classes.button}
                variant="outlined"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={recordButtonPosition}
            >
                FILTER&nbsp;BY&nbsp;GENRE{genreLabel}
            </OutlinedButton>
            <Menu
                id="simple-menu"
                className={classes.menu}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(menuOpen)}
                onClose={closeMenu}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {genreList.map((curr) => {
                    return (
                        <MenuItem
                            data-my-value={curr.id}
                            className={classes.menuItem}
                            onClick={filterMapData}
                            key={curr.id}
                        >
                            {curr.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default Filter;
