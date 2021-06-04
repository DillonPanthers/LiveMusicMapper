import React, {useState, useContext} from 'react';
import {useLocation} from 'react-router-dom'

import {MenuItem, Button, Menu, makeStyles} from '@material-ui/core';

import { GlobalState } from '../contexts/Store';
import { TICKETMASTERAPIKEY } from '../secret';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'black'
  },
}));


const Filter= ()=>{
    const currLocation = useLocation();
    const path = currLocation.pathname;
    let classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const {concerts, location}= useContext(GlobalState)
    const [concertData, setConcerts] = concerts;
    const [locationData, setLocation] = location

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);

        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setMenuOpen(false);
    }

    const filterMapData = async(event) => {
     
      const newVal = event.currentTarget.innerText;

      //if you want to use a value that is not in the innerHTML you can grab it by doing the following 
      const {myValue} = event.currentTarget.dataset; 
      const latlong = locationData.lat + ',' + locationData.lon;
    //   const ticketDataByLocation = await axios.get(
    //     `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${newVal}&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
    // );

    const ticketDataByLocation = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&genreId=${myValue}&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
  );
    //setConcerts(ticketDataByLocation.data._embedded.events)

    
      const venueObj = ticketDataByLocation.data._embedded.events.reduce((accum, event)=>{
        const venueName = event._embedded.venues[0].name; 
        if(!accum.hasOwnProperty(venueName)){
          const venueData = event._embedded.venues[0]; 
          accum[venueName] = {venueData: venueData, venueEvents: new Set() }; 
        }
        return accum; 
      },{})

      ticketDataByLocation.data._embedded.events.map(event =>{
        const eventVenue = event._embedded.venues[0].name; 
        venueObj[eventVenue].venueEvents.add(event)
      })

      setConcerts(venueObj);

      console.log(venueObj, 'venue object here')
  }


      {return path ==='/map'?<React.Fragment>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={recordButtonPosition}>
          Filter By Music Category
        </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(menuOpen)}
          onClose={closeMenu}
        >
          <MenuItem data-my-value='KnvZfZ7vAeA' className={classes.container} onClick={filterMapData}>Rock</MenuItem>
          <MenuItem data-my-value='KnvZfZ7vAev' className={classes.container} onClick={filterMapData}>Pop</MenuItem>
          <MenuItem data-my-value='KnvZfZ7vAvE' className={classes.container} onClick={filterMapData}>Jazz</MenuItem>
          <MenuItem data-my-value='KnvZfZ7vAv6' className={classes.container} onClick={filterMapData}>Country</MenuItem>
        </Menu> 
      </React.Fragment>: null}
      

}



export default Filter;