import React from 'react';
import { Typography, Grid, Card, makeStyles, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Background from '../AnimatedBackground/Background';
import EmailSignIn from './EmailSignIn';
import ContainedButton from '../StyledComponents/ContainedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '85vh',
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
        padding: '5%',
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
        paddingBottom: '8%',
    },
    label: {
        paddingTop: '8%',
    },
    secondaryLink: {
        color: 'inherit',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
    },
}));

const Login = () => {
    const classes = useStyles();

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    return (
        <>
            <Grid className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.title}>
                        Welcome Back
                    </Typography>

                    <a href="/api/spotify/login" className={classes.link}>
                        <ContainedButton startIcon={svgIcon}>
                            LOG IN WITH SPOTIFY ACCOUNT
                        </ContainedButton>
                    </a>

                    <div className={classes.divider}>
                        <p>or</p>
                    </div>
                    <EmailSignIn />
                    <Typography className={classes.label}>
                        Don't have an account?{' '}
                        <Link to="/signup" className={classes.secondaryLink}>
                            SIGN UP
                        </Link>
                    </Typography>
                </Card>
            </Grid>
            <Background />
        </>
    );
};

export default Login;
