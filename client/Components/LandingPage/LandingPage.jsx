import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Button, Container } from '@material-ui/core';
import './LandingPage.scss';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80%',
    textAlign: 'center',
    padding: '5rem',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
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
        <Link to="/map" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              width: '20rem',
              margin: '2rem',
              padding: '0.5rem 0',
            }}
          >
            SEE&nbsp;LIVE&nbsp;MUSIC&nbsp;EVENTS&nbsp;NEARBY
          </Button>
        </Link>
      </Container>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default LandingPage;
