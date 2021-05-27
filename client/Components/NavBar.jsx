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
  appBar: {
    backgroundColor: '#000A47',
    position: 'sticky',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  button: {
    color: 'white',
  },
}));

// TODO: ADD LINKS TO TITLE & BUTTONS
const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.link}>
              Live Music Mapper
            </Link>
          </Typography>
          <Button className={classes.button}>Log in</Button>
          <Button className={classes.button}>Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
