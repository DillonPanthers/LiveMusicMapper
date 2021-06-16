import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem, Button, Menu, makeStyles } from '@material-ui/core';
import axios from 'axios';

import { TICKETMASTERAPIKEY } from '../secret';
import { GlobalState } from '../contexts/Store';

const useStyles = makeStyles((theme) => ({
    container: {
        color: 'black',
    },
}));

//Use curr location even when dragging and zooming

const Filter = () => {
    const currLocation = useLocation();
    const path = currLocation.pathname;
    let classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState();
    const { location, venues, genres, theRadius } = useContext(GlobalState);
    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [genre1, setGenres]= useState([])
    const [genre, setGenre] = genres;
    const [radius, setRadius] = theRadius;

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
        // console.log('hello')
        setMenuOpen(true);
    };

    let closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(async () => {
        console.log('hello')
        const genreList = await axios.get(`/api/genre`);
        console.log('genres', genreList.data)
        setGenres(genreList.data);
        // console.log('state genres', genre1)
      }, []);
    
    console.log('state genres', genre1)
    const filterMapData = async (event) => {
        const { myValue } = event.currentTarget.dataset;
        setGenre(myValue);
        const latlong = locationData.lat + ',' + locationData.lon;
        //   const ticketDataByLocation = await axios.get(
        //     `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${newVal}&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
        // );

        const ticketDataByLocation = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&genreId=${myValue}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
        );

        /**
         * I am taking the json from the ticketmaster data, manipulating it and setting our global state concerts field, which we should probably rename venues.
         *
         * In venueObj below, I am taking the data and setting up an object that has just the venues as the keys, and the values of each of the keys,
         * will also be an object with two keys, one being venueData which would be the data of the current venue, and the second being a venueEvents, which
         * I am storing in a set because I didn't really want to have that as another object key value pair.
         */

        const venueObj = ticketDataByLocation.data._embedded.events.reduce(
            (accum, event) => {
                const venueName = event._embedded.venues[0].name;
                if (!accum.hasOwnProperty(venueName)) {
                    const venueData = event._embedded.venues[0];
                    accum[venueName] = {
                        venueData: venueData,
                        venueEvents: [],
                    };
                }
                return accum;
            },
            {}
        );

        /**
         * Now that I have an object that would look something like
         * {
         *    Barclays Center: { venueData: {data of venue details here}, venueEvents: {will be a set that has the concerts at this venue} }
         * }
         *
         * Below I am modifying those fields. For each of the events I am populating the concerts part of the venue in the object I already set up above.
         *
         */
        ticketDataByLocation.data._embedded.events.forEach((event) => {
            const eventVenue = event._embedded.venues[0].name;
            venueObj[eventVenue].venueEvents.push(event);
        });

        setVenues(venueObj);
    };

    {
        return path === '/map' ? (
            <React.Fragment>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={recordButtonPosition}
                >
                    Filter By Music Category
                </Button>
                <Menu
                    id="simple-menu"
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
                    {
                        genre1.map((curr)=>{
                            return <MenuItem
                            data-my-value={curr.id}
                            className={classes.container}
                            onClick={filterMapData}
                            key={curr.id}
                        >
                            {curr.name}
                        </MenuItem>
    
                        })
                    }
                    {/* <MenuItem
                        data-my-value="KnvZfZ7vAeA"
                        className={classes.container}
                        onClick={filterMapData}
                    >
                        Rock
                    </MenuItem>
                    <MenuItem
                        data-my-value="KnvZfZ7vAev"
                        className={classes.container}
                        onClick={filterMapData}
                    >
                        Pop
                    </MenuItem>
                    <MenuItem
                        data-my-value="KnvZfZ7vAvE"
                        className={classes.container}
                        onClick={filterMapData}
                    >
                        Jazz
                    </MenuItem>
                    <MenuItem
                        data-my-value="KnvZfZ7vAv6"
                        className={classes.container}
                        onClick={filterMapData}
                    >
                        Country
                    </MenuItem> */}

                </Menu>
            </React.Fragment>
        ) : null;
    }
};

export default Filter;
