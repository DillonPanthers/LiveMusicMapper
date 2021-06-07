import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Container, Button } from '@material-ui/core';

import Background from '../AnimatedBackground/Background';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '85%',
        textAlign: 'center',
        paddingTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            width: '85%',
        },
        zIndex: '1000',
    },
    button: {
        color: 'black',
        background: '#1DE9B6',
        margin: theme.spacing(3),
        '&:hover': {
            background: '#5F285A',
        },
        borderRadius: 50,
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
                    Find live music events for all your favorite bands and
                    artists in your&nbsp;city
                </Typography>
                <Link to="/map" className={classes.link}>
                    <Button className={classes.button}>
                        SEE&nbsp;LIVE&nbsp;MUSIC&nbsp;EVENTS&nbsp;NEARBY
                    </Button>
                </Link>
            </Container>
            <Background />
        </>
    );
};

export default LandingPage;
