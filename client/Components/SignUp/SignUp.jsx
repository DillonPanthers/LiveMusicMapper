import React from 'react';
import { Typography, Card, makeStyles, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Background from '../AnimatedBackground/Background';
import EmailSignUp from './EmailSignUp';
import ContainedButton from '../StyledComponents/ContainedButton';

// TODO: Nice to have - error message to prevent existing user from signing up
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%',
    },
    card: {
        zIndex: '1000',
        maxWidth: '50%',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5% 5%',
        borderRadius: '2.5%',
        backgroundColor: 'rgba(0,10,60,0.75)',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    divider: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
    title: {
        paddingBottom: '5%',
    },
    label: {
        paddingTop: '6%',
    },
    secondaryLink: {
        color: 'inherit',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
    },
}));

const Signup = () => {
    const classes = useStyles();

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    return (
        <>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.title}>
                        Hello, there!
                    </Typography>

                    <a href="/api/spotify/login" className={classes.link}>
                        <ContainedButton startIcon={svgIcon}>
                            SIGN UP WITH A SPOTIFY ACCOUNT
                        </ContainedButton>
                    </a>

                    <div className={classes.divider}>
                        <p>or</p>
                    </div>
                    <EmailSignUp />
                    <Typography className={classes.label}>
                        Already have an account?{' '}
                        <Link to="/login" className={classes.secondaryLink}>
                            <strong>LOG IN</strong>
                        </Link>
                    </Typography>
                </Card>
            </div>
            <Background />
        </>
    );
};

export default Signup;
