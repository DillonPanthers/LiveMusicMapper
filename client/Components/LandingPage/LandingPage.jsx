import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Container, Button } from '@material-ui/core';

import Background from './Background';

// TODO: Get z-index to work properly

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '80%',
    textAlign: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '85%',
    },
    zindex: '1000',
  },
  button: {
    color: 'black',
    background: '#1DE9B6',
    margin: theme.spacing(2),
    '&:hover': {
      background: '#5F285A',
      color: 'white',
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h2">
          Find live music events for all your favorite bands and artists in your
          city
        </Typography>
        <Link to="/map" className={classes.link}>
          <Button className={classes.button}>
            SEE&nbsp;LIVE&nbsp;MUSIC&nbsp;EVENTS&nbsp;NEARBY
          </Button>
        </Link>
      </Container>
      <Background zindex="auto" />
    </>
  );
};

export default LandingPage;
