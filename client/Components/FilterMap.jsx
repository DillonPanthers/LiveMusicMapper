import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'

import {MenuItem, Button, Menu, makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  container: {
    color: 'black'
  },
}));


const Filter= ()=>{
    const location= useLocation()
    const path= location.pathname
  console.log('path', path)
    let classes=useStyles()

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
  
    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);

        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setMenuOpen(false);
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
          <MenuItem color='black' className={classes.container}>Rock</MenuItem>
          <MenuItem className={classes.container}>Pop</MenuItem>
          <MenuItem className={classes.container}>Jazz</MenuItem>
          <MenuItem className={classes.container}>Country</MenuItem>
        </Menu> 
      </React.Fragment>: null}
      

}



export default Filter;
