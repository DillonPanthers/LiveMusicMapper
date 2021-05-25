import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

// ADD LINKS TO TITLE & BUTTONS
const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{ backgroundColor: '#000A47' }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link
              to="/"
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              Live Music Mapper
            </Link>
          </Typography>
          <Button style={{ color: 'white' }}>Log in</Button>
          <Button style={{ color: 'white' }}>Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
