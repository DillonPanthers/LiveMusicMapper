import React, { Component, useState} from 'react';
import {useLocation} from 'react-router-dom'
import PropTypes from "prop-types";
import { Select, MenuItem, Button, Menu, makeStyles} from '@material-ui/core';
import { palette } from '@material-ui/system'
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'black'
  },
  button: {
    color: 'black',
    background: '#1DE9B6',
    margin: theme.spacing(3),
    '&:hover': {
      background: '#5F285A',
      color: 'white',
    },
    borderRadius: 50,
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));


const Filter= ()=>{
    const location= useLocation()
    const path= location.pathname
    console.log('filter location', path)
    console.log(path==='/map')
    let classes=useStyles()
    // const [isActive, setIsActive] = useState(false);
    // const onClick = () => setIsActive(!isActive);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
  
    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setMenuOpen(false);
    }


      {return path==='/map'?<React.Fragment>
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
          <MenuItem color='black' className={classes.container}>Rock</MenuItem>
          <MenuItem className={classes.container}>Pop</MenuItem>
          <MenuItem className={classes.container}>Jazz</MenuItem>
          <MenuItem className={classes.container}>Country</MenuItem>
        </Menu> 
      </React.Fragment>: null}
      
}


export default Filter;
