import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Container, Button } from '@material-ui/core';

import Background from '../AnimatedBackground/Background';
import ContainedButton from '../Buttons/ContainedButton';

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
        margin: theme.spacing(3),
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
                    <ContainedButton className={classes.button}>
                        SEE&nbsp;LIVE&nbsp;MUSIC&nbsp;EVENTS&nbsp;NEARBY
                    </ContainedButton>
                </Link>
            </Container>
            <Background />
        </>
    );
};

export default LandingPage;
