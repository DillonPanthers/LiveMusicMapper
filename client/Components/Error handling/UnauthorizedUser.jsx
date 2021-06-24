import React from 'react';
import { Typography, Card, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Background from '../AnimatedBackground/Background';
import ContainedButton from '../StyledComponents/ContainedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '5%',
    },
    card: {
        zIndex: '1000',
        width: '40%',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4%',
        borderRadius: '2.5%',
        backgroundColor: 'rgba(15,15,15,0.85)',
        rowGap: '2rem',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    homeLink: {
        color: 'inherit',
    },
}));

const UnauthorizedUser = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4">Hey, curious friend!</Typography>
                    <Typography>
                        Live Music Mapper has not been officially released, so
                        if you are interested in being a user with a connected
                        Spotify account in our beta program, please shoot us a
                        message on our GitHub page with your name and email and
                        we will add you to our&nbsp;waitlist!
                    </Typography>

                    <a
                        href="https://github.com/DillonPanthers/capstone/issues"
                        className={classes.link}
                    >
                        <ContainedButton size="medium">
                            CONTACT US HERE
                        </ContainedButton>
                    </a>
                    <Typography className={classes.label}>
                        Create an&nbsp;
                        <Link to="/signup" className={classes.homeLink}>
                            <strong>email account</strong>
                        </Link>
                        &nbsp;or continue as a&nbsp;
                        <Link to="/map" className={classes.homeLink}>
                            <strong>guest&nbsp;user</strong>
                        </Link>
                    </Typography>
                </Card>
            </div>
            <Background />
        </>
    );
};

export default UnauthorizedUser;
