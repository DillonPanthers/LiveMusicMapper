import React from 'react';
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
  menuButton: {
    marginRight: theme.spacing(2),
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
            Live Music Mapper
          </Typography>
          <Button>Log in</Button>
          <Button>Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
