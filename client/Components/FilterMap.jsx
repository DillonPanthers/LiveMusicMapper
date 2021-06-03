import React, {useState, useContext} from 'react';
import {useLocation} from 'react-router-dom'

import {MenuItem, Button, Menu, makeStyles} from '@material-ui/core';

import { GlobalState } from '../contexts/Store';
import { TICKETMASTERAPIKEY, REACT_APP_GOOGLEAPIKEY } from '../secret';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'black'
  },
}));


const Filter= ()=>{
    const currLocation= useLocation()
    const path= currLocation.pathname
    let classes=useStyles()

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const {concerts, location}= useContext(GlobalState)
    const [concertData, setConcerts]= concerts
    const [locationData, setLocation]= location

    // console.log('use context filter',useContext(GlobalState))
    // console.log('concert data',locationData)
    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);

        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setMenuOpen(false);
    }

    const filterMapData = async(event) => {
      // console.log(event.target.innerText)
      const newVal = event.currentTarget.innerText;
      // console.log('my value',newVal).
      // console.log('location', locationData)
      console.log('concert data before', concertData)
      const latlong = locationData.lat + ',' + locationData.lon;
      const ticketDataByLocation = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${newVal}&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
    );
    console.log('ticket data', ticketDataByLocation)
    setConcerts(ticketDataByLocation.data._embedded.events)
  }
  // console.log('concert data after', concertData)

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
          <MenuItem value='rock' color='black' className={classes.container} onClick={filterMapData}>Rock</MenuItem>
          <MenuItem className={classes.container} onClick={filterMapData}>Pop</MenuItem>
          <MenuItem className={classes.container} onClick={filterMapData}>Jazz</MenuItem>
          <MenuItem className={classes.container} onClick={filterMapData}>Country</MenuItem>
        </Menu> 
      </React.Fragment>: null}
      

}



export default Filter;
