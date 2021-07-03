import React from 'react';
import { Typography, Grid, Card, makeStyles, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Background from '../AnimatedBackground/Background';
import EmailSignIn from './EmailSignIn';
import ContainedButton from '../StyledComponents/ContainedButton';
import HorizontalLine from '../StyledComponents/HorizontalLine';

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
        width: '30rem',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5% 0',
        borderRadius: '2.5%',
        backgroundColor: 'rgba(0,10,60,0.75)',
        rowGap: '1rem',
    },
    button: {
        width: '24rem',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
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
                    <Typography variant="h4">Welcome Back</Typography>
                    <Link to="/spotifyguestexperience" className={classes.link}>
                        <ContainedButton
                            startIcon={svgIcon}
                            className={classes.button}
                        >
                            PREVIEW&nbsp;PERSONALIZED&nbsp;EXPERIENCE
                        </ContainedButton>
                    </Link>
                    <a href="/api/spotify/login" className={classes.link}>
                        <ContainedButton
                            startIcon={svgIcon}
                            className={classes.button}
                        >
                            LOG IN WITH SPOTIFY ACCOUNT
                        </ContainedButton>
                    </a>
                    <HorizontalLine />
                    <EmailSignIn />
                    <Typography>
                        Don't have an account?{' '}
                        <Link to="/signup" className={classes.secondaryLink}>
                            <strong>SIGN UP</strong>
                        </Link>
                    </Typography>
                </Card>
            </Grid>
            <Background />
        </>
    );
};

export default Login;
