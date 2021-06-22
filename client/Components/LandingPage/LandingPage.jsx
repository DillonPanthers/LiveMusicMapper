import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Container } from '@material-ui/core';

import Background from '../AnimatedBackground/Background';
import ContainedButton from '../StyledComponents/ContainedButton';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '85%',
        textAlign: 'center',
        paddingTop: '10vh',
        [theme.breakpoints.down('xs')]: {
            width: '85%',
        },
        zIndex: '1000',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    button: {
        margin: theme.spacing(3),
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    text: {
        fontSize: '5rem',
        lineHeight: '1.15'
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    return (
        <>
            <Container className={classes.container}>
                <Typography variant="h2" className={classes.text}>
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
